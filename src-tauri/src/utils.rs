#[macro_export]
macro_rules! check_error {
    ($e:expr, $s:expr) => {
        match $e {
            Ok(val) => {
                crate::debug!("Successfully complited {}", $s);
                val
            },
            Err(err) => {
                crate::error!("Error during {}: {:?}", $s, err);
                return;
            },
        }
    };
}

#[macro_export]
macro_rules! panic_error {
    ($e:expr, $s:expr) => {
        match $e {
            Ok(val) => {
                crate::debug!("Successfully completed {}", $s);
                val
            },
            Err(err) => {
                crate::error!("Error during {}: {:?}", $s, err);
                panic!();
            },
        }
    };
}
