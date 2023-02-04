#[cfg(test)]
mod tests;

use log::{debug, info, warn, error};
use serde::{Serialize, Deserialize};

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
    debug!("Deserializing YAML");
    
    let deserealizer = serde_yaml::Deserializer::from_str(
        std::include_str!("config.yaml"),
    );

    Config::deserialize(deserealizer)
}
