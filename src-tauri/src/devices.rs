use crate::config::{CameraConfig, Config};

use std::sync::{
    mpsc::{Receiver, Sender},
    Mutex, MutexGuard, PoisonError,
};
// use std::cell::RefCell;

use nokhwa::{
    pixel_format::RgbFormat,
    utils::{
        ApiBackend, CameraFormat, CameraIndex, CameraInfo, FrameFormat, RequestedFormat,
        RequestedFormatType, Resolution,
    },
};
use nokhwa::{query, Camera, NokhwaError};

use portaudio::{DeviceIndex, DeviceInfo, Error, PortAudio};

use log::{debug, error, info, warn};

pub struct Devices {
    pub camera: Mutex<Camera>,
    pub config: Mutex<Config>,
    pub microphone: Mutex<Receiver<Vec<f32>>>,
}

unsafe impl Sync for Devices {}

unsafe impl Send for Devices {}

impl Devices {
    pub fn set_up_camera(&self, config: &CameraConfig, camera: Camera) -> Result<(), String> {
        info!(
            "Setting the camera №{:?} with config {:?}",
            camera.index(),
            config
        );

        let mut conf_guard = match self.config.lock() {
            Ok(val) => val,
            Err(_) => {
                return Err("Cannot get value from config mutex".to_string());
            }
        };
        conf_guard.camera = *config;

        let mut cam_guard = match self.camera.lock() {
            Ok(val) => val,
            Err(_) => {
                return Err("Cannot get value from camera mutex".to_string());
            }
        };
        *cam_guard = camera;

        Ok(())
    }

    pub fn set_up_microphone(&self, microphone: Receiver<Vec<f32>>) -> Result<(), String> {
        info!("Setting the microphone");

        let mut mike_guard = match self.microphone.lock() {
            Ok(val) => val,
            Err(_) => {
                return Err("Cannot get value from config mutex".to_string());
            }
        };
        *mike_guard = microphone;

        Ok(())
    }

    pub fn get_camera_index(&self) -> Result<CameraIndex, String> {
        debug!("Sending camera index");

        match self.camera.lock() {
            Ok(val) => Ok(val.index().clone()),
            Err(_) => Err("Cannot get value from camera mutex".to_string()),
        }
    }

    pub fn set_camera_settings(&self, config: &CameraConfig) -> Result<(), NokhwaError> {
        let mut cam = self.camera.lock().unwrap();

        cam.set_resolution(Resolution {
            width_x: config.width,
            height_y: config.height,
        })?;
        cam.set_frame_rate(config.fps)?;

        Ok(())
    }

    pub fn get_volume(&self) -> u8 {
        const MAXIMUM_VOLUME: f32 = 25000f32;
        
        let volume: f32 = self.microphone.lock().unwrap().recv().unwrap().iter().map(|vol| vol.abs()).sum();
        if volume < MAXIMUM_VOLUME {
            return (volume * 100f32 / MAXIMUM_VOLUME) as u8;
        }

        100u8
    }
}

pub fn get_mikes(pa: &PortAudio) -> Result<Vec<(DeviceIndex, DeviceInfo)>, Error> {
    let devices: Vec<(portaudio::DeviceIndex, portaudio::DeviceInfo)> = pa
        .devices()?
        .filter(|device| device.is_ok())
        .map(|device| device.unwrap())
        .filter(|device| device.1.max_input_channels > 0)
        .collect();

    if devices.len() == 0 {
        return Err(Error::InvalidDevice);
    }

    Ok(devices)
}

pub fn set_mike(
    index: usize,
    pa: &PortAudio,
) -> Result<std::sync::mpsc::Receiver<Vec<f32>>, Error> {
    const CHANNELS_NUMBER: i32 = 1;
    const FRAMES_NUMBER_PER_BUFFER: u32 = 256;
    const CHOSEN: usize = 0;

    let devices = get_mikes(pa)?;
    let input_params = portaudio::StreamParameters::<f32>::new(
        devices[index].0,
        CHANNELS_NUMBER,
        true,
        devices[index].1.default_low_input_latency,
    );

    let input_settings = portaudio::InputStreamSettings::new(
        input_params,
        devices[CHOSEN].1.default_sample_rate,
        FRAMES_NUMBER_PER_BUFFER,
    );

    let (sender, receiver) = std::sync::mpsc::channel::<Vec<f32>>();
    let callback = move |portaudio::InputStreamCallbackArgs { buffer, .. }| match sender
        .send(buffer.to_vec())
    {
        Ok(_) => portaudio::Continue,
        Err(_) => portaudio::Complete,
    };

    let mut stream = pa.open_non_blocking_stream(input_settings, callback)?;

    stream.start()?;
    println!("{}", stream.is_active()?);
    println!("{}", stream.is_stopped()?);

    // loop {
    //     let buffer = receiver.recv().unwrap();
    //     println!("{}", sum(buffer));
    //     std::thread::sleep(std::time::Duration::from_millis(500))
    // }

    Ok(receiver)
}

pub fn get_cams() -> Result<Vec<CameraInfo>, NokhwaError> {
    debug!("Getting camera list");

    let cams = query(ApiBackend::Auto)?;
    if cams.len() == 0 {
        return Err(NokhwaError::GeneralError(
            "Cannot find any connected camera".to_string(),
        ));
    }

    Ok(cams)
}

pub fn set_cam(index: CameraIndex, config: &CameraConfig) -> Result<Camera, NokhwaError> {
    info!("Setting the camera №{:?} with config {:?}", index, config);

    let format_type = RequestedFormatType::Exact(CameraFormat::new_from(
        config.width,
        config.height,
        FrameFormat::MJPEG,
        config.fps,
    ));

    let format = RequestedFormat::new::<RgbFormat>(format_type);
    let mut camera = Camera::new(index, format)?;
    info!("Camera info: {}", camera.info());

    debug!("Openning stream");
    camera.open_stream()?;

    Ok(camera)
}

pub fn get_devices(config: Config, camera: Camera, microphone: Receiver<Vec<f32>>) -> Devices {
    debug!("Initializing devices");

    Devices {
        camera: Mutex::new(camera),
        config: Mutex::new(config),
        microphone: Mutex::new(microphone),
    }
}
