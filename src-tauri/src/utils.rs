/// Macro wich checks if there's an error, logs info and returns result if successful
/// ```
/// let ans = check_error!(ans_res, "message you want to pass");
/// ```
#[macro_export]
macro_rules! check_error {
    ($e:expr, $s:expr $(,)?) => {
        match $e {
            Ok(val) => {
                info!("Successfully complited {}", $s);
                val
            }
            Err(err) => {
                error!("Error during {}: {:?}", $s, err);
                return;
            }
        }
    };
}

/// Macro wich panics if there's an error, logs info and returns result if successful
/// ```
/// let ans = panic_error!(ans_res, "message you want to pass");
/// ```
#[macro_export]
macro_rules! panic_error {
    ($e:expr, $s:expr $(,)?) => {
        match $e {
            Ok(val) => {
                info!("Successfully completed {}", $s);
                val
            }
            Err(err) => {
                error!("Error during {}: {:?}", $s, err);
                panic!();
            }
        }
    };
}

/// HashMap initialization macro.
/// ```
/// let d = init_dict!{
///     "test".to_string() => "Test",
/// }
/// ```
#[macro_export]
macro_rules! init_dict {
    ($( $key:expr => $val:expr ), * $(,)?) => {{
        debug!("Initializing dictionary");
        let mut hm = std::collections::HashMap::new();
        $(
            hm.insert($key, $val);
        )*
        hm
    }};
}
