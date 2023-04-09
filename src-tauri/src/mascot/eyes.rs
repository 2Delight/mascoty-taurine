use std::fmt::{Debug, Display, Formatter, Result};

use serde::{Serialize, Deserialize};

// Represents all states of eyes.
#[derive(Serialize, Deserialize, Default, PartialEq, Clone, Copy)]
pub enum Eyes {
    #[serde(rename="closed")]
    Closed,
    #[serde(rename="opened")]
    #[default]
    Opened,
}

impl Debug for Eyes {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        match self {
            Self::Closed => write!(f, "closed"),
            Self::Opened => write!(f, "opened"),
        }
    }
}

impl Display for Eyes {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{:?}", self)
    }
}
