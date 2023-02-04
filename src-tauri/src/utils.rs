#[macro_export]
macro_rules! check_error {
    ($e:expr, $s:expr $(,)?) => {
        match $e {
            Ok(val) => {
                crate::debug!("Successfully complited {}", $s);
                val
            }
            Err(err) => {
                crate::error!("Error during {}: {:?}", $s, err);
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
                crate::debug!("Successfully completed {}", $s);
                val
            }
            Err(err) => {
                crate::error!("Error during {}: {:?}", $s, err);
                panic!();
            }
        }
    };
}

#[macro_export]
macro_rules! init_dict {
    ($( $key:expr => $val:expr ), * $(,)?) => {{

	let mut hm = std::collections::HashMap::new();
    $(
		hm.insert($key, $val);
        )*
        hm
    }};
}
