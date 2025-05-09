import { EEmotion } from "../components/logic/EEmotion";
import { EPart } from "../components/logic/EPart";
import happy from "../assets/emotions-icons/happy.svg"
import def from "../assets/emotions-icons/cute.svg"
import angry from "../assets/emotions-icons/angry.svg"
import disgust from "../assets/emotions-icons/sick.svg"
import fear from "../assets/emotions-icons/scared.svg"
import surprise from "../assets/emotions-icons/shock.svg"
import sad from "../assets/emotions-icons/sad.svg"

import background from "../assets/parts-icons/background.svg"
import closedEyes from "../assets/parts-icons/closed-eyes.svg"
import closedMouth from "../assets/parts-icons/closed-mouth.svg"
import face from "../assets/parts-icons/face.svg"
import openedEyes from "../assets/parts-icons/opened-eyes.svg"
import openedMouth from "../assets/parts-icons/opened-mouth.svg"

export function descriptPart(part: EPart) {
    switch (part) {
        case EPart.background: {
            return background
        }
        case EPart.eyesClosed: {
            return closedEyes
        }
        case EPart.eyesOpened: {
            return openedEyes
        }
        case EPart.face: {
            return face
        }
        case EPart.mouthClosed: {
            return closedMouth
        }
        case EPart.mouthOpened: {
            return openedMouth
        }
    }
}

export function descriptEmotion(part: EEmotion) {
    switch (part) {
        case EEmotion.neutral: {
            return def
        }
        case EEmotion.angry: {
            return angry
        }
        case EEmotion.disgust: {
            return disgust
        }
        case EEmotion.fear: {
            return fear
        }
        case EEmotion.happy: {
            return happy
        }
        case EEmotion.surprise: {
            return surprise
        }
        case EEmotion.sad: {
            return sad
        }
    }
}

export function descriptRawEmotion(emo: string) {
    switch (emo) {
        case "neutral": {
            return EEmotion.neutral
        }
        case "angry": {
            return EEmotion.angry
        }
        case "disgust": {
            return EEmotion.disgust
        }
        case "fear": {
            return EEmotion.fear
        }
        case "happy": {
            return EEmotion.happy
        }
        case "surprise": {
            return EEmotion.surprise
        }
        case "sad": {
            return EEmotion.sad
        }
        default: {
            return EEmotion.neutral
        }
    }
}
export function descriptRawPart(part: string) {
    switch (part) {
        case "background": {
            return EPart.background
        }
        case "eyes_c": {
            return EPart.eyesClosed
        }
        case "eyes_o": {
            return EPart.eyesOpened
        }
        case "face": {
            return EPart.face
        }
        case "mouth_c": {
            return EPart.mouthClosed
        }
        case "mouth_o": {
            return EPart.mouthOpened
        }
        default: {
            return EPart.background
        }
    }
}