import { EPart } from "./EPart";

export default interface IPart {
    name: string,
    visibility: boolean,
    sourcePath: string,
    positionX: number,
    positionY: number,
    scale: number,
    type: EPart
}