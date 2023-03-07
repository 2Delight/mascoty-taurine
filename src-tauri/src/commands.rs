use crate::config::{Config, CameraConfig};
use crate::input::{get_cams, set_camera, Devices};
use crate::mascot;

use log::{debug, error, info, warn};

#[tauri::command]
pub fn get_mascot(state: tauri::State<Devices>) -> mascot::Mascot {
    debug!("Handler get_mascot has been invoken");
    mascot::get_mascot(&state)
}

#[tauri::command]
pub fn get_cameras() -> Result<Vec<String>, String> {
    debug!("Handler get_cameras has been invoken");

    match get_cams() {
        Ok(val) => Ok(val
            .iter()
            .map(|info: &nokhwa::utils::CameraInfo| info.human_name())
            .collect()),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn select_camera<'a>(index: i32, conf: CameraConfig, state: tauri::State<Devices>) -> Result<(), String> {
    debug!("Handler select_camera has been invoken");

    if index < 0 {
        return Err("Index has to be greater than -1".to_string());
    }

    let cams = get_cams().unwrap();
    let ind = cams[index as usize].index().clone();

    let cam = match set_camera(ind, &conf) {
        Ok(cam) => cam,
        Err(err) => return Err(err.to_string()),
    };

    state.set_camera(&conf, cam)?;

    Ok(())
}

fn is_in_interval(value: i32, left: i32, right: i32) -> bool {
    return value > left && value < right;
}

#[tauri::command]
pub fn set_config(conf: CameraConfig, state: tauri::State<Devices>) -> Result<(), String> {
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

    state.set_camera(
        &conf,
        match set_camera(state.get_camera_index()?, &conf) {
            Ok(cam) => cam,
            Err(err) => {
                return Err(err.to_string());
            }
        },
    )?;

    Ok(())
}
