use std::fmt::{Debug, Display, Formatter, Result};

use serde::{Serialize, Deserialize};

// Represents all states of lips.
#[derive(Serialize, Deserialize, Default, PartialEq, Clone, Copy)]
pub enum Lips {
    #[serde(rename="closed")]
    #[default]
    Closed,
    #[serde(rename="opened")]
    Opened,
}

impl Debug for Lips {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        match self {
            Self::Closed => write!(f, "closed"),
            Self::Opened => write!(f, "opened"),
        }
    }
}

impl Display for Lips {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{:?}", self)
    }
}
