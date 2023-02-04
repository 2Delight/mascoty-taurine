use crate::config::Config;
use crate::panic_error;

use std::sync::{Mutex, MutexGuard};
// use std::cell::RefCell;

use nokhwa::pixel_format::RgbFormat;
use nokhwa::utils::{ApiBackend, CameraFormat, CameraIndex, CameraInfo, FrameFormat, RequestedFormat, RequestedFormatType};
use nokhwa::{query, Camera, NokhwaError};

use log::{debug, error, info, warn};

pub struct Devices {
    camera: Mutex<Camera>,
    conf: Mutex<Config>,
}

impl Devices {
    pub fn set_camera(&self, config: Config, camera: Camera) {
        let mut conf_guard = self.conf.lock().unwrap();
        *conf_guard = config;

        let mut cam_guard = self.camera.lock().unwrap();
        *cam_guard = camera;
    }

    pub fn get_conf(&self) -> Config {
        self.conf.lock().unwrap().clone()
    }

    pub fn get_camera_index(&self) -> CameraIndex {
        self.camera.lock().unwrap().index().clone()
    }

    // pub fn set_fps(&self, fps: u32) {
    //     let mut conf_guard = self.conf.lock().unwrap();
    //     conf_guard.camera.fps = fps;

    //     let mut cam_guard = self.camera.lock().unwrap();
    //     *cam_guard = new_camera(&conf_guard).unwrap();
    // }
}

unsafe impl Sync for Devices {}

unsafe impl Send for Devices {}

pub struct Input {}

pub fn get_cams() -> Result<Vec<CameraInfo>, NokhwaError> {
    let cams = query(ApiBackend::Auto)?;
    if cams.len() == 0 {
        return Err(
            NokhwaError::GeneralError(
                "Cannot find any connected camera".to_string(),
            ),
        );
    }
    
    Ok(cams)
}

pub fn set_camera(cams: Vec<CameraInfo>, index: CameraIndex, config: &Config) -> Result<Camera, NokhwaError> {
    info!("First camera index: {}", index);
    debug!("Connecting to camera");
    let format_type = RequestedFormatType::Exact(
        CameraFormat::new_from(
            config.camera.width,
            config.camera.height,
            FrameFormat::MJPEG,
            config.camera.fps,
        ),
    );
    let format = RequestedFormat::new::<RgbFormat>(format_type);
    let mut camera = Camera::new(index, format)?;
    info!("Camera info: {}", camera.info());
    
    debug!("Openning stream");
    camera.open_stream()?;
    Ok(camera)
}

pub fn get_devices(config: Config, camera: Camera) -> Result<Devices, NokhwaError> {
    debug!("Camera has been initialized");
    let cams = get_cams()?;
    Ok(
        Devices {
            camera: Mutex::new(camera),
            conf: Mutex::new(config),
        },
    )
}

pub fn get_input(devices: &Devices) -> Result<Input, NokhwaError> {
    debug!("Getting input");
    debug!("Getting camera instance");
    let mut camera = panic_error!(devices.camera.lock(), "failed to lock mutex");

    debug!("Getting frame");
    let frame = camera.frame()?;

    debug!("Decoding image");
    let rgb = frame.decode_image::<RgbFormat>()?;
    rgb.get_pixel(10, 10);
    info!(
        "Frame resolution: {}; Pixel: {:?}",
        frame.resolution(),
        rgb.get_pixel(10, 10),
    );

    debug!("Sending info");
    Ok(Input {})
}
