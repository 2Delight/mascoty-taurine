import { EPart } from "../components/logic/EPart";

export default function descriptPart(part: EPart | undefined) {
    if (part) {
        switch (part) {
            case EPart.background: {
                return "BG"
            }
            case EPart.eyesClosed: {
                return "EC"
            }
            case EPart.eyesOpened: {
                return "EO"
            }
            case EPart.face: {
                return "FC"
            }
            case EPart.mouthClosed: {
                return "MC"
            }
            case EPart.mouthOpened: {
                return "MO"
            }
        }
    } else {
        return ""
    }
}