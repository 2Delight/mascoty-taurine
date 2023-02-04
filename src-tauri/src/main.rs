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
use crate::input::{Devices, get_devices, get_cams, set_camera};

use config::Config;
use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_mascot(state: tauri::State<Devices>) -> mascot::Mascot {
    mascot::get_mascot(&state)
}

#[tauri::command]
fn get_cameras() -> Result<Vec<String>, String> {
    match get_cams() {
        Ok(val) => Ok(
            val.iter()
            .map(
                |info: &nokhwa::utils::CameraInfo| {
                    info.description().to_string()
                },
            ).collect(),
        ),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn select_camera(index: u8, conf: Config, state: tauri::State<Devices>) -> Result<(), String> {
    let cam = match set_camera(get_cams().unwrap(), index, &conf) {
        Ok(cam) => cam,
        Err(err) => {
            return Err(err.to_string())
        },
    };
    
    state.set_camera(conf, cam);
    Ok(())
}

#[tauri::command]
fn set_fps(fps: u32, state: tauri::State<Devices>) {
    // state.set_fps(fps);
    todo!()
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
        .manage(conf)
        .invoke_handler(
            tauri::generate_handler![
                get_mascot,
                get_cameras,
                select_camera,
                set_fps,
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
