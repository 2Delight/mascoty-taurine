#[cfg(test)]
mod tests;

use log::{debug, info, warn, error};
use serde::{Serialize, Deserialize};
use tch::{CModule, vision::imagenet};

#[derive(Clone, Copy, Debug, Serialize, Deserialize)]
pub struct Config {
    pub camera: Camera,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize)]
pub struct Camera {
    pub height: u32,
    pub width: u32,
    pub fps: u32,
}

pub fn import_config() -> Result<Config, serde_yaml::Error> {
    let weights = std::include_bytes!("checkpoint.pt");
    let mut model = CModule::load_data(&mut std::io::Cursor::new(weights)).unwrap();
    model.set_eval();
    // imagenet::load_image_from_memory();


    debug!("Deserializing YAML");
    let deserealizer = serde_yaml::Deserializer::from_str(
        std::include_str!("config.yaml"),
    );

    Config::deserialize(deserealizer)
}
