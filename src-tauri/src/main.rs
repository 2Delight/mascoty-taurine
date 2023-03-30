#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate log;
extern crate nokhwa;
extern crate rand;
extern crate serde;
extern crate serde_json;
extern crate serde_yaml;
extern crate simple_logger;

mod commands;
mod config;
mod devices;
mod input;
mod mascot;
mod utils;

use crate::commands::*;
use crate::config::import_config;
use crate::devices::{get_cams, get_devices, set_cam, set_mike};

use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

fn main() {
    // Setting up the logger.
    match SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init()
    {
        Ok(()) => {}
        Err(err) => panic!("Cannot initialize logger: {:?}", err),
    };

    // Importing config.
    debug!("Config parsing");
    let conf = import_config();
    info!("Config: {:?}", conf);

    // Setting up default camera.
    debug!("Getting default camera index");
    let cam = panic_error!(
        set_cam(get_cams().unwrap()[0].index().clone(), &conf.camera,),
        "setting up camera",
    );

    // Setting up portaudio.
    debug!("Getting portaudio");
    let pa = panic_error!(portaudio::PortAudio::new(), "getting portaudio library");

    // Setting up default microphone.
    debug!("Getting default micro");
    let mike = panic_error!(set_mike(0, &pa), "setting up microphone");

    // Creating devices.
    debug!("Getting devices");
    let devices = get_devices(conf, cam, mike);

    // Test mascot getting.
    mascot::get_mascot(&devices);

    // Starting app.
    debug!("Building the app");
    tauri::Builder::default()
        // Adding devices to state.
        .manage(devices)
        // Adding portaudio to state.
        .manage(pa)
        .invoke_handler(tauri::generate_handler![
            get_mascot,
            get_cameras,
            select_camera,
            set_camera_config,
            get_microphones,
            select_microphone,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
