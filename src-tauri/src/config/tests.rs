use super::import_config;

#[test]
fn check_config_import() {
    let conf = import_config();
    assert!(conf.camera.height > 0);
    assert!(conf.camera.width > 0);
    assert!(conf.camera.fps > 0);
}
