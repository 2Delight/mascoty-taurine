#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate dotenv;
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

use crate::config::{import_config, Camera, Config, Service};
use crate::input::get_devices;

use dotenv::dotenv;
use input::Devices;
use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_mascot(state: tauri::State<Devices>) -> mascot::Mascot {
    mascot::get_mascot(&state)
}

fn main() {
    match SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init()
    {
        Ok(()) => {}
        Err(err) => panic!("Cannot initialize logger: {:?}", err),
    };

    match dotenv().ok() {
        Some(_) => debug!("Successfully imported data from .env"),
        None => debug!("Failed to work with .env"),
    };

    debug!("Config parsing");
    let conf = Config {
        service: Service{
            port: 8080,
            url: "127.0.0.1".to_string(),
        },
        camera: Camera {
            height: 720,
            width: 1280,
            fps: 30,
        },
    };

    info!("Config: {:?}", conf);

    debug!("Getting devices");

    let devices = panic_error!(get_devices(&conf), "getting devices");

    tauri::Builder::default()
        .manage(devices)
        .invoke_handler(tauri::generate_handler![get_mascot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
