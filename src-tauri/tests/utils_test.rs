use mascoty_taurine::{check_error, init_dict, panic_error};

#[test]
fn check_panic_error_ok() {
    let ok: Result<i32, &str> = Result::Ok(0);
    assert!(panic_error!(ok, "ok") == 0);
}

#[test]
#[should_panic]
fn check_panic_error_err() {
    let err: Result<i32, &str> = Result::Err("error");
    assert!(panic_error!(err, "err") != 0);
}

#[test]
fn check_check_error() {
    let ok: Result<&str, &str> = Result::Ok("okay");
    assert!(check_error!(ok, "ok") == "okay");

    let err: Result<&str, &str> = Result::Err("error");
    assert!(check_error!(err, "err") == "error");
}

#[test]
fn check_init_dict() {
    let d = init_dict! {
        "test0".to_string() => "Test0",
        "test1".to_string() => "Test1",
    };

    let mut hm = std::collections::HashMap::<String, &str>::new();
    hm.insert("test0".to_string(), "Test0");
    hm.insert("test1".to_string(), "Test1");

    assert!(d == hm);
}