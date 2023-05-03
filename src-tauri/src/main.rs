#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use mascoty_taurine::commands::*;
use mascoty_taurine::config::import_config;
use mascoty_taurine::devices::{get_cams, set_cam, set_mike, Devices};

use log::{debug, info};
use simple_logger::SimpleLogger;
use tokio::sync::Mutex;

use anyhow::Result;

const DEFAULT_DEVICE_INDEX: usize = 0;

fn main() -> Result<()> {
    // Setting up the logger.
    SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init()?;

    // Importing config.
    debug!("Config parsing");
    let conf = import_config()?;
    info!("Config: {:?}", conf);

    // Setting up default camera.
    debug!("Getting default camera index");
    let cam = set_cam(
        get_cams()?[DEFAULT_DEVICE_INDEX].index().clone(),
        &conf.camera,
    )?;
    let host = cpal::host_from_id(cpal::available_hosts()[0])?;

    // Setting up default microphone.
    debug!("Getting default micro");
    let mike = set_mike(DEFAULT_DEVICE_INDEX, &host)?;

    // Starting app.
    debug!("Building the app");
    tauri::Builder::default()
        // Adding devices to state.
        .manage(Devices::new(conf, cam, mike))
        // Adding host to state.
        .manage(host)
        // Adding current mascot.
        .manage(Mutex::new(String::new()))
        .invoke_handler(tauri::generate_handler![
            get_mascot,
            get_cameras,
            select_camera,
            set_camera_config,
            get_microphones,
            select_microphone,
            get_volume,
            get_raw_mascot,
            set_raw_mascot,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
