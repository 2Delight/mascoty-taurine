use crate::devices::Devices;

use nokhwa::pixel_format::*;
use nokhwa::{query, Camera, NokhwaError};

use log::{debug, error, info, warn};

pub struct Input {}

pub fn get_input(devices: &Devices) -> Result<Input, NokhwaError> {
    debug!("Getting input");
    debug!("Getting camera instance");

    let mut camera = devices.camera.lock().unwrap();

    let buffer = camera.frame()?;
    // let img = image::io::Reader::new(std::io::Cursor::new(&img))
    //     .with_guessed_format()
    //     .unwrap()
    //     .decode()
    //     .unwrap();

    debug!("{}", buffer.source_frame_format());

    // debug!("Decoding image");
    // let mut img = Vec::new();
    // img.resize(
    //     frame.resolution().x() as usize * frame.resolution().y() as usize * 3,
    //     0,
    // );

    // frame.decode_image_to_buffer::<RgbFormat>(&mut img).unwrap();

    buffer.decode_image::<LumaFormat>().unwrap().save("image.png").unwrap();
    let img = image::open("image.png").unwrap();

    let model = &mut devices.config.lock().unwrap().model;
    model.set_eval();

    let output = tch::vision::imagenet::load_image_and_resize224_from_memory(img.as_bytes())
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
    Ok(Input {})
}
