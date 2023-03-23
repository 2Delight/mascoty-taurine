import { writeTextFile, BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";
import { sep } from "@tauri-apps/api/path";
import html2canvas from "html2canvas";
import IMascot from "../components/logic/IMascot";


function _base64ToArrayBuffer(base64: string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export default async function saveMascot(mascot: IMascot) {
    await writeTextFile(mascot.workingDir + sep + "CONF_" + mascot.projectName + ".mascot", JSON.stringify(mascot), { dir: BaseDirectory.Document }).then(() => {
        // alert("Saved")
        html2canvas(document.getElementsByClassName("mascotPlace")[0] as any, { allowTaint: true, useCORS: true }).then(canvas => {
            console.log(canvas.toDataURL("image/png"))
            if (mascot) {
                writeBinaryFile(mascot.workingDir + "preview_" + mascot.projectName + ".png", _base64ToArrayBuffer(canvas.toDataURL("image/png").substring(22))).then(() => {
                    console.log("updated preview image")
                })
            }
        });
    })
}