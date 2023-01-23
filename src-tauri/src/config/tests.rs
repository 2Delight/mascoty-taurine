use super::{import_config};

#[test]
fn check_config_right_path() -> Result<(), Box<dyn std::error::Error>> {
    import_config("src/config/config.yaml")?;
    Ok(())
}

#[test]
#[should_panic]
fn check_config_wrong_path() {
    import_config("it is not even a path lol").unwrap();
}

#[test]
fn check_url() {
    let conf = import_config("src/config/config.yaml").unwrap();
    assert!(conf.service.url.len() > 0);
}

#[test]
fn check_port() {
    let conf = import_config("src/config/config.yaml").unwrap();
    assert!(conf.service.port > 0);
}
