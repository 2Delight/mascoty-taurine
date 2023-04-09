use crate::config::CameraConfig;
use crate::devices::{get_cams, get_mikes, set_cam, set_mike, Devices};
use crate::mascot;

use cpal::traits::DeviceTrait;
use cpal::Host;
use log::{debug, info};
use tokio::sync::Mutex;

use std::string::String;

/// Handler for getting Mascot.
#[tauri::command]
pub fn get_mascot(state: tauri::State<Devices>) -> Result<mascot::Mascot, String> {
    debug!("Handler get_mascot has been invoken");
    match mascot::get_mascot(&state) {
        Ok(mascot) => Ok(mascot),
        Err(err) => Err(format!("failed to get mascot: {}", err.to_string())),
    }
}

/// Gets mascot's source pathes.
#[tauri::command]
pub fn get_raw_mascot(state: tauri::State<Mutex<String>>) -> String {
    debug!("Getting mascot JSON");
    state.blocking_lock().clone()
}

/// Sets mascot's source pathes.
#[tauri::command]
pub fn set_raw_mascot(mascot: String, state: tauri::State<Mutex<String>>) {
    debug!("Setting mascot JSON");
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
    let cams = match get_cams() {
        Ok(val) => Ok(val
            .iter()
            .map(|info: &nokhwa::utils::CameraInfo| info.human_name())
            .collect()),
        Err(err) => Err(err.to_string()),
    };

    if cams.is_ok() {
        info!("Found cams: {:?}", cams);
    }

    cams
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
    state: tauri::State<Devices>,
) -> Result<(), String> {
    debug!("Handler select_camera has been invoken");

    let cams = get_cams().unwrap();
    let ind = cams[index].index().clone();

    let cam = match set_cam(ind, &conf) {
        Ok(cam) => cam,
        Err(err) => return Err(err.to_string()),
    };

    state.set_up_camera(&conf, cam)?;

    Ok(())
}

/// Checks if value is in interval.
fn is_in_interval(value: i32, left: i32, right: i32) -> bool {
    return value > left && value < right;
}

/// Handler which updates configuration of selected camera.
///
/// If ok => returns nothing.
///
/// If err => returns string error.
#[tauri::command]
pub fn set_camera_config(conf: CameraConfig, state: tauri::State<Devices>) -> Result<(), String> {
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

    match state.set_camera_settings(&conf) {
        Ok(()) => Ok(()),
        Err(err) => Err(err.to_string()),
    }
}

/// Handler for getting list of available microphones.
///
/// If ok => returns vector of camera names.
///
/// If err => returns string error.
#[tauri::command]
pub fn get_microphones(state: tauri::State<Host>) -> Result<Vec<String>, String> {
    let mikes = match get_mikes(&*state) {
        Ok(mikes) => Ok(mikes
            .iter()
            .map(|mike| format!("{}", mike.1.name().unwrap()))
            .collect()),
        Err(err) => {
            return Err(err.to_string());
        }
    };

    if mikes.is_ok() {
        info!("Microphones: {:?}", mikes);
    }

    mikes
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
    state: tauri::State<Devices>,
) -> Result<(), String> {
    state.update_microphone(match set_mike(index, &host) {
        Ok(val) => val,
        Err(err) => return Err(err.to_string()),
    })
}

/// Gets current volume in interval [0; 100].
#[tauri::command]
pub fn get_volume(state: tauri::State<Devices>) -> u8 {
    state.get_volume()
}
