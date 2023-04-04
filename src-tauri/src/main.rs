#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use mascoty_taurine::{commands::*, check_error};
use mascoty_taurine::config::import_config;
use mascoty_taurine::devices::{get_cams, set_cam, set_mike, Devices};
use mascoty_taurine::panic_error;

use log::{debug, error, info, warn};
use simple_logger::SimpleLogger;

const DEFAULT_DEVICE_INDEX: usize = 0;

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
        set_cam(get_cams().unwrap()[DEFAULT_DEVICE_INDEX].index().clone(), &conf.camera,),
        "setting up camera",
    );

    let host = panic_error!(cpal::host_from_id(cpal::available_hosts()[0]), "host set up");

    // Setting up default microphone.
    debug!("Getting default micro");
    let mike = panic_error!(set_mike(DEFAULT_DEVICE_INDEX, &host), "setting up microphone");

    // Creating devices.
    debug!("Getting devices");
    let devices = Devices::new(conf, cam, mike);

    // Starting app.
    debug!("Building the app");
    tauri::Builder::default()
        // Adding devices to state.
        .manage(devices)
        // Adding host to state.
        .manage(host)
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
