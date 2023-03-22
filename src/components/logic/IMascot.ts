import { EEmotion } from "./EEmotion";
import IEmotion from "./IEmotion";

export default interface IMascot {
    blink: boolean,
    emotion: EEmotion,
    lips: boolean,
    voice: string,
    emotions: IEmotion[],
    bgColor: string,
    selectedEmotion: number,
    selectedPart: number,

}