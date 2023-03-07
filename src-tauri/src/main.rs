#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows",
)]

extern crate log;
extern crate nokhwa;
extern crate rand;
extern crate serde;
extern crate serde_json;
extern crate serde_yaml;
extern crate simple_logger;

mod config;
mod input;
mod mascot;
mod utils;
mod commands;

use crate::commands::*;
use crate::config::import_config;
use crate::input::{get_cams, set_camera, get_devices};

use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

fn main() {
    match SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init() {
        Ok(()) => {}
        Err(err) => panic!("Cannot initialize logger: {:?}", err),
    };

    debug!("Config parsing");
    let conf = import_config();
    info!("Config: {:?}", conf);

    debug!("Getting default camera index");
    let cam = set_camera(
        get_cams()
            .unwrap()[0]
            .index()
            .clone(),
        &conf.camera,
    ).unwrap();

    debug!("Getting devices");
    let devices = get_devices(conf, cam);

    mascot::get_mascot(&devices);

    debug!("Building the app");
    tauri::Builder::default()
        .manage(devices)
        .invoke_handler(
            tauri::generate_handler![
                get_mascot,
                get_cameras,
                select_camera,
                set_config,
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}