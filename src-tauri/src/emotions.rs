use std::fmt::{Debug, Display, Formatter, Result};

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Default)]
pub enum Emotion {
    #[serde(rename="angry")]
    Angry = 0,
    #[serde(rename="disgust")]
    Disgust,
    #[serde(rename="fear")]
    Fear,
    #[serde(rename="happy")]
    Happy,
    #[serde(rename="neutral")]
    #[default]
    Neutral,
    #[serde(rename="sad")]
    Sad,
    #[serde(rename="surprise")]
    Surprise,
}

impl Emotion {
    pub fn from_num(i: u8) -> Emotion {
        match i {
            0 => Emotion::Angry,
            1 => Emotion::Disgust,
            2 => Emotion::Fear,
            3 => Emotion::Happy,
            4 => Emotion::Neutral,
            5 => Emotion::Sad,
            6 => Emotion::Surprise,
            _ => Emotion::Neutral,
        }
    }

    pub fn to_num(e: Emotion) -> u8 {
        e as u8
    }
}

impl Debug for Emotion {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        match self {
            Self::Angry => write!(f, "angry"),
            Self::Disgust => write!(f, "disgust"),
            Self::Fear => write!(f, "fear"),
            Self::Happy => write!(f, "happy"),
            Self::Neutral => write!(f, "neutral"),
            Self::Sad => write!(f, "sad"),
            Self::Surprise => write!(f, "surprise"),
        }
    }
}

impl Display for Emotion {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{:?}", self)
    }
}
