use std::fmt::{Debug, Display, Formatter, Result};

use serde::{Serialize, Deserialize};

/// Represents 1 of 7 basic emotions supported by model.
#[derive(Serialize, Deserialize, Default, PartialEq, Clone, Copy)]
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
    /// Converts number into emotion.
    /// ```
    /// use mascoty_taurine::emotions::Emotion;
    /// 
    /// let emotion = Emotion::from_num(0);
    /// assert!(emotion == Emotion::Angry);
    /// 
    /// let emotion = Emotion::from_num(100);
    /// assert!(emotion == Emotion::Neutral);
    /// ```
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

    /// Converts emotion into number.
    /// ```
    /// use mascoty_taurine::emotions::Emotion;
    /// 
    /// let emotion = Emotion::Fear;
    /// assert!(emotion.to_num() == 2);
    /// ```
    pub fn to_num(&self) -> u8 {
        *self as u8
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
