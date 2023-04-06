/// Macro wich checks if there's an error, logs info and returns result if successful
/// ```
/// use log::{debug, error, info, warn};
/// 
/// let res: Result<(), ()> = Result::Ok(());
/// let ans = mascoty_taurine::check_error!(res, "message you want to pass");
/// 
/// assert!(ans == ());
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
                debug!("Error during {}: {:?}", $s, err);
                return;
            }
        }
    };
}

/// Macro wich panics if there's an error, logs info and returns result if successful
/// ```
/// use log::{debug, error, info, warn};
/// 
/// let res: Result<(), ()> = Result::Ok(());
/// let ans = mascoty_taurine::panic_error!(res, "message you want to pass");
/// 
/// assert!(ans == ());
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
/// use log::{debug, error, info, warn};
/// 
/// let d = mascoty_taurine::init_dict!{
///     "test0".to_string() => "Test0",
///     "test1".to_string() => "Test1",
/// };
/// 
/// let mut hm = std::collections::HashMap::<String, &str>::new();
/// hm.insert("test0".to_string(), "Test0");
/// hm.insert("test1".to_string(), "Test1");
/// 
/// assert!(d == hm);
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
