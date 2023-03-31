use crate::config::{CameraConfig, Config};

use std::sync::{
    mpsc::{Receiver, Sender},
    Mutex, MutexGuard, PoisonError,
};
// use std::cell::RefCell;

use log::{debug, error, info, warn};
use nokhwa::{
    pixel_format::RgbFormat,
    utils::{
        ApiBackend, CameraFormat, CameraIndex, CameraInfo, FrameFormat, RequestedFormat,
        RequestedFormatType, Resolution,
    },
};
use nokhwa::{query, Camera, NokhwaError};
use portaudio::{stream::Input, DeviceIndex, DeviceInfo, Error, NonBlocking, PortAudio, Stream};

/// Microphone input receiver.
pub struct Microphone {
    receiver: Receiver<Vec<f32>>,
    stream_: Stream<NonBlocking, Input<f32>>,
}

/// Devices input receiver.
///
/// Mutex is needed to safely get mutable fields from &Devices.
pub struct Devices {
    pub camera: Mutex<Camera>,
    pub config: Mutex<Config>,
    pub microphone: Mutex<Microphone>,
}

unsafe impl Sync for Devices {}

unsafe impl Send for Devices {}

impl Devices {
    /// Initializes all devices.
    pub fn new(config: Config, camera: Camera, microphone: Microphone) -> Devices {
        debug!("Initializing devices");

        Devices {
            camera: Mutex::new(camera),
            config: Mutex::new(config),
            microphone: Mutex::new(microphone),
        }
    }

    /// Initializes camera based on the config.
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

    /// Updates camera settings based on config.
    pub fn set_camera_settings(&self, config: &CameraConfig) -> Result<(), NokhwaError> {
        let mut cam = self.camera.lock().unwrap();

        cam.set_resolution(Resolution {
            width_x: config.width,
            height_y: config.height,
        })?;
        cam.set_frame_rate(config.fps)?;

        Ok(())
    }

    /// Gets index of currently selected camera.
    pub fn get_camera_index(&self) -> Result<CameraIndex, String> {
        debug!("Sending camera index");

        match self.camera.lock() {
            Ok(val) => Ok(val.index().clone()),
            Err(_) => Err("Cannot get value from camera mutex".to_string()),
        }
    }

    /// Updates microphone based on passed new one.
    pub fn update_microphone(&self, microphone: Microphone) -> Result<(), String> {
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

    /// Gets current microphone volume.
    pub fn get_volume(&self) -> u8 {
        const MAXIMUM_VOLUME: f32 = 25000f32;

        let volume: f32 = self
            .microphone
            .lock()
            .unwrap()
            .receiver
            .recv()
            .unwrap()
            .iter()
            .map(|vol| vol.abs())
            .sum();
        if volume < MAXIMUM_VOLUME {
            return (volume * 100f32 / MAXIMUM_VOLUME) as u8;
        }

        100u8
    }
}

/// Gets list of available microphones.
pub fn get_mikes(pa: &PortAudio) -> Result<Vec<(DeviceIndex, DeviceInfo)>, Error> {
    let devices: Vec<(portaudio::DeviceIndex, portaudio::DeviceInfo)> = pa
        .devices()?
        // Filters working devices.
        .filter(|device| device.is_ok())
        .map(|device| device.unwrap())
        // Filters microphones.
        .filter(|device| device.1.max_input_channels > 0)
        .collect();

    if devices.len() == 0 {
        return Err(Error::InvalidDevice);
    }

    Ok(devices)
}

/// Initializes microphone based on index.
pub fn set_mike(index: usize, pa: &PortAudio) -> Result<Microphone, Error> {
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
        Ok(()) => portaudio::Continue,
        Err(err) => {
            error!("{:?}", err);
            portaudio::Complete
        }
    };

    let mut stream = pa.open_non_blocking_stream(input_settings, callback)?;

    stream.start()?;
    info!("Is stream active: {}", stream.is_active()?);
    info!("Is stream stopped: {}", stream.is_stopped()?);

    Ok(Microphone {
        receiver: receiver,
        stream_: stream,
    })
}

/// Gets list of available cameras.
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

/// Initializes camera based on index.
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
