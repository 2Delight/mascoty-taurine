#[cfg(test)]
mod tests;

use log::{debug, error, info, warn};
use serde::{Deserialize, Serialize};
use tch::CModule;

/// Main app config which contains camera properties and model.
/// ```
/// let conf = mascoty_taurine::config::import_config();
/// println!("{:?}", conf);
/// ```
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

/// Camera config which includes width and height as resolution sides in px and fps as frames per second
/// ```
/// let cam_conf = mascoty_taurine::config::CameraConfig {
///     height: 720,
///     width: 1080,
///     fps: 30,
/// };
/// println!("{:?}", cam_conf);
/// ```
#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq)]
pub struct CameraConfig {
    pub height: u32,
    pub width: u32,
    pub fps: u32,
}

/// Imports camera config from config.yaml and model from model.pt
/// ```
/// let conf = mascoty_taurine::config::import_config();
/// 
/// let def_cam = mascoty_taurine::config::CameraConfig {
///     height: 720,
///     width: 1280,
///     fps: 30,
/// };
/// 
/// assert!(conf.camera == def_cam);
/// ```
pub fn import_config() -> Config {
    debug!("Deserializing YAML");
    let deserealizer = serde_yaml::Deserializer::from_str(std::include_str!("config.yaml"));

    let conf = Config {
        camera: CameraConfig::deserialize(deserealizer).unwrap(),
        model: tch::CModule::load_data(&mut std::io::Cursor::new(std::include_bytes!("model.pt",)))
            .unwrap(),
    };

    conf
}
