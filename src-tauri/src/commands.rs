use crate::config::Config;
use crate::mascot;
use crate::input::{Devices, get_cams, set_camera};

#[tauri::command]
pub fn get_mascot(state: tauri::State<Devices>) -> mascot::Mascot {
    mascot::get_mascot(&state)
}

#[tauri::command]
pub fn get_cameras() -> Result<Vec<String>, String> {
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
pub fn select_camera(index: i32, conf: Config, state: tauri::State<Devices>) -> Result<(), String> {
    if index < 0 {
        return Err("Index has to be greater than -1".to_string());
    }
    let cams = get_cams().unwrap();
    let ind  = cams[index as usize].index().clone();
    
    let cam = match set_camera(cams, ind, &conf) {
        Ok(cam) => cam,
        Err(err) => {
            return Err(err.to_string())
        },
    };

    state.set_camera(conf, cam);

    Ok(())
}

#[tauri::command]
pub fn set_config(conf: Config, state: tauri::State<Devices>) -> Result<(), String> {
    if conf.camera.fps < 1 || conf.camera.fps > 30 {
        return Err("FPS has to be greater than 0 and lesser than 31!".to_string());
    }

    if conf.camera.height < 1 || conf.camera.height > 10000 {
        return Err("Camera height in pixels has to be greater than 0 and lesser than 10001!".to_string());
    }

    if conf.camera.width < 1 || conf.camera.width > 10000 {
        return Err("Camera width in pixels has to be greater than 0 and lesser than 10001!".to_string());
    }

    state.set_camera(conf, set_camera(
        get_cams().unwrap(),
        state.get_camera_index(),
        &conf,
    ).unwrap());

    Ok(())
}
