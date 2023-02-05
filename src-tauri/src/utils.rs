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
