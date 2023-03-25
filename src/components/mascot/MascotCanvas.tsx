import { writeBinaryFile, writeFile } from "@tauri-apps/api/fs";
import { atob } from "buffer";
import html2canvas from "html2canvas";
import { createRef, useCallback, useContext, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { MascotContext } from "../../App";
import { contextMenuGray, menuGray } from "../../utils/Colors";
import IPart from "../logic/IPart";
import MascotPart from "./MascotPart";

export default function MascotCanvas() {
  const reeeef = createRef<HTMLDivElement>()

  const mascot = useContext(MascotContext);

  const [inFocus, setInFocus] = useState(false)


  return <div className="mascotPlace" ref={reeeef} style={{
    flex: 10,
    // height: "100%",

    overflow: "auto",
    margin: 10,
    borderRadius: "10px 0 0 0 ",
    background: mascot?.mascot.bgColor,
    // aspectRatio: 1
  }}
    onMouseEnter={() => setInFocus(true)}
    onMouseLeave={() => setInFocus(false)}
  >
    {inFocus && <div style={{ fontSize: 20, padding: 10, opacity: 0.6, position: "absolute", minWidth: 100, borderRadius: 30, right: 20, top: 20, backgroundColor: contextMenuGray, color: menuGray }}>
        {"Zoom: " + mascot?.mascot.zoom}
      </div>}
      
    <div className="canvas"
      style={{

        position: "relative",
        // transform:"scale(1)"
      }}

    >
      


      {mascot && mascot.mascot.emotions.length > 0 && mascot.mascot.emotions[mascot.mascot.selectedEmotion]?.parts?.map((c, i) => {
        return c.visibility && <MascotPart partIndex={i} key={i + c.sourcePath + c.name} useFocus={inFocus} />
      })}
    </div>
  </div>
}