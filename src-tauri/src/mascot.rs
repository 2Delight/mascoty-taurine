use crate::devices::Devices;
use crate::panic_error;
use crate::emotions::Emotion;

use std::{time::{SystemTime, UNIX_EPOCH}, io::Cursor};
use std::io::{Read, Write};

use log::{debug, error, info, warn};
use nokhwa::{pixel_format::*, NokhwaError, Buffer};
use serde::{Deserialize, Serialize};
use tch::Tensor;

/// Mascot properties.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Mascot {
    pub emotion: Emotion,
    pub blink: bool,
    pub lips: bool,
    pub voice: u8,
}

/// Transforms RGB image tensor to BW.
/// 
/// It takes original 3-channel tensor and makes 1-channel tensor with mean vallues.
fn to_bw(tensor: Tensor) -> Tensor {
    (tensor.index(&[Some(Tensor::of_slice(&[0i64])), None, None])
        + tensor.index(&[Some(Tensor::of_slice(&[1i64])), None, None])
        + tensor.index(&[Some(Tensor::of_slice(&[2i64])), None, None]))
        / 3f64
}

/// Gets index for largest value in tensor.
fn argmax(tensor: &[f64]) -> u8 {
    let mut index = 0u8;

    for i in 0..tensor.len() {
        if tensor[i] > tensor[index as usize] {
            index = i as u8;
        }
    }

    index
}

/// Helps to find coordinates of corners for square crop image.
fn get_cropped_corners(mut width: u32, mut height: u32) -> (u32, u32, u32, u32) {
    if width < height {
        (width, height) = (height, width);
    }

    ((width - height) / 2, 0, height, height)
}

/// Crops image.
fn crop_image(path: &str) {
    let mut img = image::open(path).unwrap();

    let points = get_cropped_corners(img.width(), img.height());
    let img = image::imageops::crop(&mut img, points.0, points.1, points.2, points.3);

    img.to_image().save(path).unwrap();
}

/// Gets emotion from input
fn get_emotion(devices: &Devices, image_path: &str) -> Emotion {
    debug!("Using model");
    let model = &mut devices.config.lock().unwrap().model;
    let output = to_bw(tch::vision::imagenet::load_image_and_resize224(image_path).unwrap())
        .unsqueeze(0)
        .apply(model)
        .squeeze();
    info!("Model output: {:?}",output);

    let emotion = Emotion::from_num(argmax(&output.iter::<f64>().unwrap().collect::<Vec<f64>>()));
    info!("Got emotion: {}", emotion);

    emotion
}

/// Gets properties of mascot based on device input.
pub fn get_mascot(devices: &Devices) -> Result<Mascot, NokhwaError> {
    debug!("Getting input");
    debug!("Getting camera instance");
    let mut camera = devices.camera.lock().unwrap();

    debug!("Getting frame");
    let frame = camera.frame()?;

    debug!("Getting path");
    let path = tauri::api::path::document_dir().unwrap().join("MASCOTY").join("img.jpg");
    let path = path.as_os_str().to_str().unwrap();

    debug!("Saving image");
    let img = frame.decode_image::<RgbFormat>()?;
    img.save(path).unwrap();

    crop_image(path);

    debug!("Getting volume");
    let volume = devices.get_volume();

    let mascot = Mascot {
        emotion: get_emotion(devices, path),
        blink: SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() % 10 == 0,
        lips: volume > 10,
        voice: volume,
    };
    info!("Mascot: {:?}", mascot);

    Ok(mascot)
}
