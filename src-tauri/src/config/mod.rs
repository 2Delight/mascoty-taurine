#[cfg(test)]
mod tests;

use std::fs::File;
use std::include_str;

use log::{debug, info, warn, error};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    // pub service: Service,
    pub camera: Camera,
}

// #[derive(Debug, Serialize, Deserialize)]
// pub struct Service {
//     pub url: String,
//     pub port: u16,
// }

#[derive(Debug, Serialize, Deserialize)]
pub struct Camera {
    pub height: u32,
    pub width: u32,
    pub fps: u32,
}

pub fn import_config() -> Result<Config, serde_yaml::Error> {
    debug!("Deserializing YAML");
    let deserealizer = serde_yaml::Deserializer::from_str(
        std::include_str!("config.yaml"),
    );
    Config::deserialize(deserealizer)
}
