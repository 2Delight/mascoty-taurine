use super::{import_config, CameraConfig};

#[test]
fn check_config_import() {
    let conf = import_config().unwrap();
    assert!(conf.camera.height > 0);
    assert!(conf.camera.width > 0);
    assert!(conf.camera.fps > 0);

    let conf = import_config().unwrap();
    let def_cam = CameraConfig {
        height: 480,
        width: 640,
        fps: 30,
    };
    assert!(conf.camera == def_cam);
}
