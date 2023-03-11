use crate::config::{CameraConfig, Config};
use crate::panic_error;

use std::io::Read;
use std::sync::{Mutex, MutexGuard, PoisonError};
// use std::cell::RefCell;

use nokhwa::pixel_format::RgbFormat;
use nokhwa::utils::{
    ApiBackend, CameraFormat, CameraIndex, CameraInfo, FrameFormat, RequestedFormat,
    RequestedFormatType,
};
use nokhwa::{query, Camera, NokhwaError};

use log::{debug, error, info, warn};

pub struct Devices {
    camera: Mutex<Camera>,
    conf: Mutex<Config>,
}

unsafe impl Sync for Devices {}

unsafe impl Send for Devices {}

impl Devices {
    pub fn set_camera(&self, config: &CameraConfig, camera: Camera) -> Result<(), String> {
        info!(
            "Setting the camera №{:?} with config {:?}",
            camera.index(),
            config
        );

        let mut conf_guard = match self.conf.lock() {
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

    pub fn get_camera_index(&self) -> Result<CameraIndex, String> {
        debug!("Sending camera index");

        match self.camera.lock() {
            Ok(val) => Ok(val.index().clone()),
            Err(_) => Err("Cannot get value from camera mutex".to_string()),
        }
    }
}

pub struct Input {}

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

pub fn set_camera(index: CameraIndex, config: &CameraConfig) -> Result<Camera, NokhwaError> {
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
    camera.open_stream().unwrap();
    Ok(camera)
}

pub fn get_devices(config: Config, camera: Camera) -> Devices {
    debug!("Initializing devices");

    Devices {
        camera: Mutex::new(camera),
        conf: Mutex::new(config),
    }
}

pub fn get_input(devices: &Devices) -> Result<Input, NokhwaError> {
    debug!("Getting input");
    debug!("Getting camera instance");

    let mut camera = panic_error!(devices.camera.lock(), "failed to lock mutex");

    debug!("Getting frame");
    let frame = camera.frame()?;

    debug!("Decoding image");
    let rgb = frame.decode_image::<RgbFormat>()?;
    // let model = &mut devices.conf.lock().unwrap().model;
    // model.set_eval();

    // let output = tch::vision::imagenet::load_image_from_memory(rgb.to_vec().as_slice())
    //     .unwrap()
    //     .unsqueeze(0)
    //     .apply(model);
    // info!("{}", tch::vision::imagenet::top(&output, 1)[0].1);

    rgb.get_pixel(10, 10);
    info!(
        "Frame resolution: {}; Pixel: {:?}",
        frame.resolution(),
        rgb.get_pixel(10, 10),
    );

    debug!("Sending info");
    Ok(Input {})
}
