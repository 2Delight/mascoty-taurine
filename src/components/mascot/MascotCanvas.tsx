import { writeBinaryFile, writeFile } from "@tauri-apps/api/fs";
import { atob } from "buffer";
import html2canvas from "html2canvas";
import { createRef, useCallback, useContext, useRef } from "react";
import { useSelector } from "react-redux"
import { MascotContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../utils/redux_state/StoreHooks"
import IPart from "../logic/IPart";
import MascotPart from "./MascotPart";

export default function MascotCanvas() {
  const reeeef = createRef<HTMLDivElement>()

  const mascot = useContext(MascotContext);
  return <div className="mascotPlace" ref={reeeef} style={{
    flex: 10,
    // height: "100%",

    overflow: "auto",
    margin: 10,
    borderRadius: "10px 0 0 0 ",
    background: mascot?.mascot.bgColor,
    // aspectRatio: 1
  }}
  >
    <div className="canvas"
      style={{

        position: "relative",
        // transform:"scale(1)"
      }}
    >
      {mascot && mascot.mascot.emotions.length > 0 && mascot.mascot.emotions[mascot.mascot.selectedEmotion]?.parts?.map((c, i) => {
        return c.visibility && <MascotPart partIndex={i} key={i + c.sourcePath + c.name} />
      })}
    </div>
  </div>
}