use mascoty_taurine::{stringify_result, init_dict};

#[test]
fn check_stringify_result_ok() {
    let err: Result<u8, i32> = Ok(255u8);
    match stringify_result!(err) {
        Ok(val) => assert_eq!(val, 255u8),
        Err(_) => panic!("test failed: expected ok"),
    }
    assert!(stringify_result!(err).unwrap() == 255u8);
}

#[test]
fn check_stringify_result_err() {
    let err: Result<u8, i32> = Err(1000);
    match stringify_result!(err) {
        Ok(_) => panic!("test failed: expected err"),
        Err(err) => assert_eq!(err, "1000".to_string()),
    }
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
