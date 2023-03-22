import { EEmotion } from "./EEmotion";
import IPart from "./IPart";

export default interface IEmotion {
    name: string,
    visibility: boolean,
    parts: IPart[],
    emotion: EEmotion,
}