import { writeBinaryFile } from "@tauri-apps/api/fs";
import html2canvas from "html2canvas";
import IMascot from "../components/logic/IMascot";
import ShadowCanvas from "../components/mascot/ShadowCanvas";

// filename = broadcast/emotion/eyes_mouth.png

function _base64ToArrayBuffer(base64: string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export function FreeFiles() {

}

export async function CreateFiles(mascot: IMascot) {



    for (let i = 0; i < mascot.emotions.length; i++) {
        let style = (document.getElementsByClassName("mascotPlace")[0] as HTMLElement).style
        let shadow = ShadowCanvas(200, 200, mascot, i, true, true)
        document.append(shadow as any)
        let canvas = await html2canvas(shadow as any, { allowTaint: true, useCORS: true })
        console.log(canvas.toDataURL("image/png"))
        await writeBinaryFile(mascot.workingDir + "preview_" + i + "_" + mascot.projectName + ".png", _base64ToArrayBuffer(canvas.toDataURL("image/png").substring(22))).then(() => {
            console.log("updated preview image")
        })
    }
}

export function GetData() {

}