#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate dict;
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

fn init_menu() -> tauri::Menu {
    let file_items = init_dict! {
        "quit".to_string() => "Quit".to_string(),
        "close".to_string() => "Close".to_string(),
    };
    debug!("{:?}", file_items);
    let menu_items = init_dict! {
        "edit".to_string() => "Edit".to_string(),
        "save".to_string() => "Save".to_string(),
        "guide".to_string() => "Guide".to_string(),
        "contacts".to_string() => "Contact Us".to_string(),
    };
    debug!("{:?}", menu_items);

    let mut submenu_items = tauri::Menu::new();
    for (id, title) in file_items.iter() {
        submenu_items = submenu_items.add_item(tauri::CustomMenuItem::new(id, title));
    }

    let mut menu = tauri::Menu::new()
        .add_submenu(tauri::Submenu::new("File", submenu_items));
    for (id, title) in menu_items.iter() {
        menu = menu.add_item(tauri::CustomMenuItem::new(id, title));
    }

    menu
}

fn main() {
    match SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init()
    {
        Ok(()) => {}
        Err(err) => panic!("Cannot initialize logger: {:?}", err),
    };

    debug!("Config parsing");
    let conf = panic_error!(import_config(), "parsing config");

    info!("Config: {:?}", conf);

    debug!("Getting devices");

    let devices = panic_error!(get_devices(conf.clone()), "getting devices");

    tauri::Builder::default()
        .menu(init_menu())
        .manage(devices)
        .invoke_handler(tauri::generate_handler![get_mascot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
