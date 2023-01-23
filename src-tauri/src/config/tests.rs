use super::{import_config};

#[test]
fn check_url() {
    let conf = import_config("src/config/config.yaml");
    assert!(conf.service.url.len() > 0);
}

#[test]
fn check_port() {
    let conf = import_config("src/config/config.yaml");
    assert!(conf.service.port > 0);
}
