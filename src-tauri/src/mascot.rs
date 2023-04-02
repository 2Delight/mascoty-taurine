use crate::devices::Devices;
use crate::panic_error;
use crate::emotions::Emotion;

use log::{debug, error, info, warn};
use nokhwa::{pixel_format::*, NokhwaError};
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

/// Gets properties of mascot based on device input.
pub fn get_mascot(devices: &Devices) -> Result<Mascot, NokhwaError> {
    debug!("Getting input");
    debug!("Getting camera instance");

    let mut camera = devices.camera.lock().unwrap();

    debug!("Getting frame");
    let buffer = camera.frame()?;

    // buffer.decode_image::<RgbFormat>()?.save("img.jpg").unwrap();

    // image::save_buffer("img.png", buffer.buffer(), camera.resolution().width_x, camera.resolution().height_y, image::ColorType::Rgb8).unwrap();

    // let img = image::open("img.png").unwrap();

    // let mut img = Vec::new();
    // img.resize(
    //     camera.resolution().x() as usize * camera.resolution().y() as usize * 3,
    //     0,
    // );
    // camera.write_frame_to_buffer::<RgbFormat>(&mut img).unwrap();
    // let img = image::io::Reader::new(std::io::Cursor::new(&img))
    //     .with_guessed_format()
    //     .unwrap()
    //     .decode()
    //     .unwrap();

    // debug!("{}", frame.source_frame_format());

    // debug!("Decoding image");
    // let mut img = Vec::new();
    // img.resize(
    //     frame.resolution().x() as usize * frame.resolution().y() as usize * 3,
    //     0,
    // );

    // frame.decode_image_to_buffer::<RgbFormat>(&mut img).unwrap();

    let model = &mut devices.config.lock().unwrap().model;
    model.set_eval();

    // let output = tch::vision::imagenet::load_image_and_resize224_from_memory(img.as_bytes())
    //     .unwrap()
    //     .unsqueeze(0)
    //     .apply(model);

    let output = to_bw(tch::vision::imagenet::load_image_and_resize224("img.jpg").unwrap())
        .unsqueeze(0)
        .apply(model)
        .squeeze();

    info!(
        "{:?}",
        output
    );

    let emotion = Emotion::from_num(argmax(&output.iter::<f64>().unwrap().collect::<Vec<f64>>()));
    info!("{}", emotion);

    debug!("Sending info");
    Ok(Mascot {
        emotion: emotion,
        blink: false,
        lips: false,
        voice: devices.get_volume(),
    })
}
