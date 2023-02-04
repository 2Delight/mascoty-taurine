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

mod config;
mod input;
mod mascot;
mod utils;

use crate::config::import_config;
use crate::input::get_devices;

use input::Devices;
use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_mascot(state: tauri::State<Devices>) -> mascot::Mascot {
    mascot::get_mascot(&state)
}

#[tauri::command]
fn set_fps(fps: u32, state: tauri::State<Devices>) {
    state.set_fps(fps);
}

fn main() {
    match SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init() {
        Ok(()) => {}
        Err(err) => panic!("Cannot initialize logger: {:?}", err),
    };

    debug!("Config parsing");
    let conf = panic_error!(import_config(), "parsing config");

    info!("Config: {:?}", conf);

    debug!("Getting devices");

    let devices = panic_error!(get_devices(conf.clone()), "getting devices");

    tauri::Builder::default()
        .manage(devices)
        .invoke_handler(tauri::generate_handler![get_mascot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
