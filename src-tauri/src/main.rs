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
mod mascot;
mod utils;

use crate::commands::*;
use crate::config::import_config;
use crate::devices::{get_cams, get_devices, set_cam, set_mike};

use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

fn main() {
    match SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init()
    {
        Ok(()) => {}
        Err(err) => panic!("Cannot initialize logger: {:?}", err),
    };

    debug!("Config parsing");
    let conf = import_config();
    info!("Config: {:?}", conf);

    debug!("Getting default camera index");
    let cam = panic_error!(
        set_cam(get_cams().unwrap()[0].index().clone(), &conf.camera,),
        "setting up camera",
    );

    let pa = portaudio::PortAudio::new().unwrap();

    debug!("Getting default micro");
    let mike = panic_error!(set_mike(0, &pa), "setting up microphone");

    debug!("Getting devices");
    let devices = get_devices(conf, cam, mike);

    mascot::get_mascot(&devices);

    debug!("Building the app");
    tauri::Builder::default()
        .manage(devices)
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
