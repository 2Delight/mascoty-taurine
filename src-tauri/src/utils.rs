/// Macro used to make internals of Err part of enum a string.
/// 
/// Useful in tauri::command handlers.
/// ```
/// use mascoty_taurine::stringify_result;
/// 
/// fn helper() -> Result<i32, i32> {
///     Ok(0)
/// }
/// 
/// #[tauri::command]
/// fn handler() -> Result<(), String> {
///     let val = stringify_result!(helper())?;
///     // Work with value...
///     Ok(())
/// }
/// ```
#[macro_export]
macro_rules! stringify_result {
    ($e:expr $(,)?) => {
        match $e {
            Ok(val) => Ok(val),
            Err(err) => Err(err.to_string()),
        }
    };
}

/// HashMap initialization macro.
/// ```
/// use mascoty_taurine::init_dict;
/// 
/// let d = init_dict!{
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
        log::debug!("Initializing dictionary");
        let mut hm = std::collections::HashMap::new();
        $(
            hm.insert($key, $val);
        )*
        hm
    }};
}
