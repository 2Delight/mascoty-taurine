#[cfg(test)]
mod tests;

use std::fs::File;

use log::{debug, info, warn, error};
use serde_yaml;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    pub service: Service,
    pub camera: Camera,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Service {
    pub url: String,
    pub port: u16,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Camera {
    pub height: u32,
    pub width: u32,
    pub fps: u32,
}

pub fn import_config(path: &str) -> Result<Config, Box<dyn std::error::Error>> {
    debug!("Reading config file");
    let file = File::open(path)?;

    debug!("Deserializing YAML");
    match serde_yaml::from_reader(file) {
        Ok(conf) => Ok(conf),
        Err(err) => Err(Box::new(err)),
    }
}
