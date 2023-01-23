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

pub fn import_config(path: &str) -> Config {
    debug!("Reading config file");
    let file = match File::open(path) {
        Ok(file) => file,
        Err(err) => {
            debug!("Failed to read config file, using default one, {}", err);
            return init_standard_config();
        },
    };

    debug!("Deserializing YAML");
    match serde_yaml::from_reader(file) {
        Ok(conf) => conf,
        Err(err) => {
            debug!("Failed to pass config file, using default one, {}", err);
            init_standard_config()
        },
    }
}

fn init_standard_config() -> Config {
    Config {
        service: Service{
            port: 8080,
            url: "127.0.0.1".to_string(),
        },
        camera: Camera {
            height: 720,
            width: 1280,
            fps: 30,
        },
    }
}
