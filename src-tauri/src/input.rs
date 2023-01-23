use crate::config::Config;
use crate::panic_error;

use std::sync::Mutex;
// use std::cell::RefCell;

use nokhwa::pixel_format::RgbFormat;
use nokhwa::utils::{ApiBackend, CameraFormat, FrameFormat, RequestedFormat, RequestedFormatType};
use nokhwa::{query, Camera, NokhwaError};

use log::{debug, error, info, warn};

pub struct Devices {
    camera: Mutex<Camera>,
}

unsafe impl Sync for Devices {}

unsafe impl Send for Devices {}

pub struct Input {}

pub fn get_devices(config: &Config) -> Result<Devices, NokhwaError> {
    debug!("Getting devices");
    let cams = query(ApiBackend::Auto)?;

    info!("Number of cameras: {}", cams.len());
    if cams.len() == 0 {
        return Err(
            NokhwaError::GeneralError(
                "Cannot find any connected camera".to_string(),
            ),
        );
    }

    info!("First camera index: {}", cams[0].index());
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
    let mut camera = Camera::new(cams[0].index().to_owned(), format)?;
    info!("Camera info: {}", camera.info());
    
    debug!("Openning stream");
    camera.open_stream()?;

    debug!("Camera has been initialized");
    Ok(
        Devices {
            camera: Mutex::new(camera),
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
