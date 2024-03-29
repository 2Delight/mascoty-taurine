import { EEmotion } from "./EEmotion";
import IEmotion from "./IEmotion";

export default interface IMascot {
    emotions: IEmotion[],
    bgColor: string,
    selectedEmotion: number,
    selectedPart: number,
    workingDir:string,
    projectName:string,
    zoom: number,
    shake: number,
    maxMic: number,
    minMic: number,
}