use crate::devices::Devices;
use crate::emotion::Emotion;

use std::time::{SystemTime, UNIX_EPOCH};

use log::{debug, info};
use nokhwa::{pixel_format::RgbFormat};
use serde::{Deserialize, Serialize};
use tch::Tensor;

use anyhow::Result;

/// Mascot properties.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Mascot {
    pub emotion: Emotion,
    pub blink: bool,
    pub lips: bool,
}

/// Transforms RGB image tensor to BW.
///
/// It takes original 3-channel tensor and makes 1-channel tensor with mean vallues.
pub fn to_bw(tensor: Tensor) -> Tensor {
    (tensor.index(&[Some(Tensor::of_slice(&[0i64])), None, None])
        + tensor.index(&[Some(Tensor::of_slice(&[1i64])), None, None])
        + tensor.index(&[Some(Tensor::of_slice(&[2i64])), None, None]))
        / 3f64
}

/// Gets index for largest value in tensor.
pub fn argmax(tensor: &[f64]) -> u8 {
    let mut index = 0u8;

    for i in 0..tensor.len() {
        if tensor[i] > tensor[index as usize] {
            index = i as u8;
        }
    }

    index
}

/// Helps to find coordinates of corners for square crop image.
pub(crate) fn get_cropped_corners(width: u32, height: u32) -> (u32, u32, u32, u32) {
    if width < height {
        return (0, (height - width), width, width);
    }

    ((width - height) / 2, 0, height, height)
}

/// Crops image.
fn crop_image<I: image::GenericImageView>(img: &mut I) -> image::SubImage<&mut I> {
    let points = get_cropped_corners(img.width(), img.height());
    image::imageops::crop(img, points.0, points.1, points.2, points.3)
}

/// Gets emotion from input
fn get_emotion(devices: &Devices, image: &str) -> Result<Emotion> {
    debug!("Using model");
    let model = &mut devices.config.blocking_lock().model;
    let output = to_bw(tch::vision::imagenet::load_image(image)?)
        .unsqueeze(0)
        .apply(model)
        .squeeze();
    info!("Model output: {:?}", output);

    let emotion = Emotion::from_num(argmax(&output.iter::<f64>()?.collect::<Vec<f64>>()));
    info!("Got emotion: {}", emotion);

    Ok(emotion)
}

/// Returns mascot blink every secs_num seconds.
fn is_blink(secs_num: u64) -> Result<bool> {
    let secs_from_unix_epoch = SystemTime::now()
        .duration_since(UNIX_EPOCH)?
        .as_secs();

    Ok(secs_from_unix_epoch % secs_num == 0)
}

/// Gets properties of mascot based on device input.
pub fn get_mascot(devices: &Devices) -> Result<Mascot> {
    debug!("Getting input");
    debug!("Getting camera instance");
    let mut camera = devices.camera.blocking_lock();

    debug!("Getting frame");
    let frame = camera.frame()?;

    debug!("Getting path");
    let path = tauri::api::path::document_dir()
        .unwrap()
        .join("MASCOTY")
        .join("img.jpg");
    let path = path.as_os_str().to_str().unwrap();

    debug!("Decoding image");
    let mut img = frame.decode_image::<RgbFormat>()?;

    debug!("Cropping image");
    img = crop_image(&mut img).to_image();

    debug!("Resizing image");
    img = image::imageops::resize(&img, 224, 224, image::imageops::FilterType::Gaussian);
    img.save(path)?;

    let mascot = Mascot {
        emotion: get_emotion(devices, path)?,
        blink: is_blink(10)?,
        lips: devices.get_volume() > 10,
    };
    info!("Mascot: {:?}", mascot);

    Ok(mascot)
}
