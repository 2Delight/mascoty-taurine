#[cfg(test)]
mod tests;

use anyhow::Result;
use log::debug;
use serde::{Deserialize, Serialize};
use tch::CModule;

/// Main app config which contains camera properties and model.
/// ```
/// use log::info;
/// use mascoty_taurine::config::import_config;
///
/// let conf = import_config();
/// info!("{:?}", conf);
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
/// use log::info;
/// use mascoty_taurine::config::CameraConfig;
///
/// let cam_conf = CameraConfig {
///     height: 720,
///     width: 1080,
///     fps: 30,
/// };
/// info!("{:?}", cam_conf);
/// ```
#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq)]
pub struct CameraConfig {
    pub height: u32,
    pub width: u32,
    pub fps: u32,
}

/// Imports camera config from config.yaml and model from model.pt
/// ```
/// use mascoty_taurine::config::import_config;
/// use mascoty_taurine::config::CameraConfig;
///
/// let conf = import_config().unwrap();
///
/// let def_cam = CameraConfig {
///     height: 480,
///     width: 640,
///     fps: 30,
/// };
///
/// assert!(conf.camera == def_cam);
/// ```
pub fn import_config() -> Result<Config> {
    debug!("Deserializing YAML");
    let deserealizer = serde_yaml::Deserializer::from_str(std::include_str!("config.yaml"));

    let mut conf = Config {
        camera: CameraConfig::deserialize(deserealizer)?,
        model: tch::CModule::load_data(&mut std::io::Cursor::new(std::include_bytes!("model.pt")))?,
    };
    conf.model.set_eval();

    Ok(conf)
}
