use crate::devices::Devices;
use crate::panic_error;

use log::{debug, error, info, warn};
use nokhwa::{pixel_format::*, NokhwaError};
use rand::Rng;
use serde::{Deserialize, Serialize};
use tch::Tensor;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Mascot {
    pub emotion: String,
    pub blink: bool,
    pub lips: bool,
    pub voice: u8,
}

pub fn get_mascot(devices: &Devices) -> Result<Mascot, NokhwaError> {
    debug!("Getting input");
    debug!("Getting camera instance");

    let mut camera = devices.camera.lock().unwrap();

    debug!("Getting frame");
    let buffer = camera.frame()?;

    buffer.decode_image::<RgbFormat>()?.save("img.jpg").unwrap();

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

    let output = tch::vision::imagenet::load_image_and_resize224("img.jpg")
        .unwrap()
        .unsqueeze(0)
        .apply(model);

    info!("{}", tch::vision::imagenet::top(&output, 1)[0].1);

    // rgb.get_pixel(10, 10);
    // info!(
    //     "Frame resolution: {}; Pixel: {:?}",
    //     frame.resolution(),
    //     rgb.get_pixel(10, 10),
    // );

    debug!("Sending info");
    Ok(Mascot {
        emotion: "".to_string(),
        blink: false,
        lips: false,
        voice: devices.get_volume(),
    })
}
