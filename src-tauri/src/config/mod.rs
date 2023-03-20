#[cfg(test)]
mod tests;

use log::{debug, error, info, warn};
use serde::{Deserialize, Serialize};
use tch::CModule;

pub struct Config {
    pub camera: CameraConfig,
    pub model: CModule,
}

impl std::fmt::Debug for Config {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Config")
            .field("Camera", &self.camera)
            .finish()
    }
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize)]
pub struct CameraConfig {
    pub height: u32,
    pub width: u32,
    pub fps: u32,
}

pub fn import_config() -> Config {
    debug!("Deserializing YAML");
    let deserealizer = serde_yaml::Deserializer::from_str(std::include_str!("config.yaml"));

    let conf = Config {
        camera: CameraConfig::deserialize(deserealizer).unwrap(),
        model: tch::CModule::load_data(&mut std::io::Cursor::new(std::include_bytes!(
            "model.pt",
        )))
        .unwrap(),
    };

    conf
}
