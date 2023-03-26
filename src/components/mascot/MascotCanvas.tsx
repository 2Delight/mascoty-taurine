import { Slide } from "@mui/material";
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

  const zoomIn = () => {
    if (mascot) {
      let a = structuredClone(mascot.mascot)
      a.zoom = (Math.floor(a.zoom * 100) + 5) / 100
      mascot.setMascot(a)
      console.log("ZOOM: " + a.zoom)
    }
  }

  const zoomOut = () => {
    if (mascot) {
      console.log(mascot.mascot)
      let a = structuredClone(mascot.mascot)
      a.zoom = (Math.floor(a.zoom * 100) - 5) / 100
      mascot.setMascot(a)
      console.log("ZOOM: " + a.zoom)
    }
  }

  return <div style={{
    flex: 10,
    // overflow: "auto",
    // margin: 10,
    position: "relative"
  }} onMouseEnter={() => setInFocus(true)}
    onMouseLeave={() => setInFocus(false)}>
    <div className="mascotPlace" ref={reeeef} style={{
      // flex: 10,
      overflow: "auto",
      height: "100vh",
      // margin: 10,
      borderRadius: "10px 0 0 0 ",
      background: mascot?.mascot.bgColor,
      // 
    }}

    >
      <div className="canvas"
        style={{
          position: "relative",
        }}>
        {mascot && mascot.mascot.emotions.length > 0 && mascot.mascot.emotions[mascot.mascot.selectedEmotion]?.parts?.map((c, i) => {
          return c.visibility && <MascotPart partIndex={i} key={i + c.sourcePath + c.name} useFocus={inFocus} />
        })}
      </div>
    </div>

    <Slide direction="up" in={inFocus} mountOnEnter unmountOnExit style={{ transform: 'translateX(100px)',position: "absolute", left: "calc(50% - 110px)", bottom: 20,  }}>
      <div style={{ userSelect: "none", opacity: 0.8, position: "absolute",flexDirection: "row", display: "flex" }}>
        <div style={{ marginRight: 5,cursor:"pointer", fontSize: 16, padding: 10, width: 24, borderRadius: 30, backgroundColor: contextMenuGray, color: menuGray }}
          onClick={() => {
            zoomIn()
          }}>
          +
        </div>
        <div style={{ marginRight: 5, fontSize: 16, padding: 10, minWidth: 100, borderRadius: 30, backgroundColor: contextMenuGray, color: menuGray }}>
          Zoom: {(mascot && mascot.mascot) ? Math.floor(mascot.mascot.zoom * 100) : ""}%
        </div>
        <div style={{ marginRight: 5, cursor:"pointer",fontSize: 16, padding: 10, width: 24, borderRadius: 30, backgroundColor: contextMenuGray, color: menuGray }}
          onClick={() => {
            zoomOut()
          }}>
          -
        </div>
      </div>
    </Slide>
  </div>
}