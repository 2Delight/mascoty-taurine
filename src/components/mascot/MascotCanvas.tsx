import { writeBinaryFile, writeFile } from "@tauri-apps/api/fs";
import { atob } from "buffer";
import html2canvas from "html2canvas";
import { createRef, useCallback, useContext, useRef } from "react";
import { useSelector } from "react-redux"
import { MascotContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../utils/redux_state/StoreHooks"
import IPart from "../logic/IPart";
import MascotPart from "./MascotPart";

function decodeBase64(base64: string) {
  const text = window.atob(base64);
  const length = text.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const decoder = new TextDecoder(); // default is utf-8
  return decoder.decode(bytes);
}

function _base64ToArrayBuffer(base64: string) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export default function MascotCanvas() {
  const reeeef = createRef<HTMLDivElement>()
  // const { image, takeScreenshot, isLoading, clear } = useScreenshot({ref: {current:document.getElementsByClassName("mascotPlace")[0]} });
  // const color = useAppSelector((state) => state.background.color)
  // const dispatch = useAppDispatch()

  const takeScreen = useCallback(() => {
    console.warn(reeeef)
    html2canvas(document.getElementsByClassName("mascotPlace")[0] as any, { allowTaint: true, useCORS: true }).then(canvas => {
      console.log(canvas.toDataURL("image/png"))
      if (mascot) {
        // console.log(atob(canvas.toDataURL("image/png")))
        writeBinaryFile(mascot.mascot.workingDir + "preview_" + mascot.mascot.projectName + ".png", _base64ToArrayBuffer(canvas.toDataURL("image/png").substring(22))).then(() => {
          console.log("updated preview image")
        })
      }
    });
    // if (reeeef.current) {
    // takeScreenshot("png", { ref: reeeef }).then((img) => {
    //   console.log(img)
    //   // clear()
    //   console.log(reeeef)

    // })
    // }
  }, [reeeef.current])
  const mascot = useContext(MascotContext);

  // console.warn(reeeef)

  return <div className="mascotPlace" ref={reeeef} style={{
    flex: 10,
    // height: "100%",
    background: mascot?.mascot.bgColor,
    overflow: "auto",
    margin: 10,
    borderRadius: "10px 0 0 0 ",
    position: "relative",
    // aspectRatio: 1
  }}
  >
    {mascot && mascot.mascot.emotions.length > 0 && mascot.mascot.emotions[mascot.mascot.selectedEmotion]?.parts?.map((c, i) => {
      return c.visibility && <MascotPart partIndex={i} key={i + c.sourcePath + c.name} />
    })}
    <button onClick={() => {
      takeScreen()
    }}> </button>
  </div>
}