use crate::config::CameraConfig;
use crate::devices::{get_cams, get_mikes, set_cam, set_mike, Devices};
use crate::{mascot, stringify_result};

use cpal::traits::DeviceTrait;
use cpal::Host;
use log::{debug, info};
use tokio::sync::Mutex;

use std::string::String;

/// Handler for getting Mascot.
#[tauri::command]
pub fn get_mascot(devices: tauri::State<Devices>) -> Result<mascot::Mascot, String> {
    debug!("Handler get_mascot has been invoken");
    stringify_result!(mascot::get_mascot(&devices))
}

/// Gets mascot's source pathes.
#[tauri::command]
pub fn get_raw_mascot(state: tauri::State<Mutex<String>>) -> String {
    info!("Getting mascot JSON: {:?}", state);
    state.blocking_lock().clone()
}

/// Sets mascot's source pathes.
#[tauri::command]
pub fn set_raw_mascot(mascot: String, state: tauri::State<Mutex<String>>) {
    info!("Setting mascot JSON: {:?}", state);
    info!("Got mascot: {}", mascot);
    *state.blocking_lock() = mascot;
}

/// Handler for getting list of available cameras.
///
/// If ok => returns vector of camera names.
///
/// If err => returns string error.
#[tauri::command]
pub fn get_cameras() -> Result<Vec<String>, String> {
    Ok(stringify_result!(get_cams())?
        .iter()
        .map(|info: &nokhwa::utils::CameraInfo| info.human_name())
        .collect())
}

/// Handler which receives index of camera and sets it as chosen.
///
/// If ok => returns nothing.
///
/// If err => returns string error.
#[tauri::command]
pub fn select_camera(
    index: usize,
    conf: CameraConfig,
    devices: tauri::State<Devices>,
) -> Result<(), String> {
    debug!("Handler select_camera has been invoken");

    let cams = stringify_result!(get_cams())?;
    let ind = cams[index].index().clone();

    let cam = stringify_result!(set_cam(ind, &conf))?;

    stringify_result!(devices.set_up_camera(&conf, cam))?;

    Ok(())
}

/// Checks if value is in interval.
fn is_in_interval(value: i32, left: i32, right: i32) -> bool {
    value > left && value < right
}

/// Handler which updates configuration of selected camera.
///
/// If ok => returns nothing.
///
/// If err => returns string error.
#[tauri::command]
pub fn set_camera_config(conf: CameraConfig, devices: tauri::State<Devices>) -> Result<(), String> {
    debug!("Handler set_config has been invoken");

    if !is_in_interval(conf.fps as i32, 0, 31) {
        return Err("FPS has to be greater than 0 and lesser than 31!".to_string());
    }

    if !is_in_interval(conf.fps as i32, 0, 10001) {
        return Err(
            "Camera height in pixels has to be greater than 0 and lesser than 10001!".to_string(),
        );
    }

    if !is_in_interval(conf.fps as i32, 0, 10001) {
        return Err(
            "Camera width in pixels has to be greater than 0 and lesser than 10001!".to_string(),
        );
    }

    stringify_result!(devices.set_camera_settings(&conf))
}

/// Handler for getting list of available microphones.
///
/// If ok => returns vector of camera names.
///
/// If err => returns string error.
#[tauri::command]
pub fn get_microphones(host: tauri::State<Host>) -> Result<Vec<String>, String> {
    Ok(stringify_result!(get_mikes(&host))?
        .iter()
        .map(|mike| mike.1.name().unwrap())
        .collect())
}

/// Handler which receives index of microphone and sets it as chosen.
///
/// If ok => returns nothing.
///
/// If err => returns string error.
#[tauri::command]
pub fn select_microphone(
    index: usize,
    host: tauri::State<Host>,
    devices: tauri::State<Devices>,
) -> Result<(), String> {
    devices.update_microphone(stringify_result!(set_mike(index, &host))?)
}

/// Gets current volume in interval [0; 100].
#[tauri::command]
pub fn get_volume(devices: tauri::State<Devices>) -> u8 {
    devices.get_volume()
}
