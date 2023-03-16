import { useContext } from "react";
import { useSelector } from "react-redux"
import { MascotContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../utils/redux_state/StoreHooks"
import IPart from "../logic/IPart";
import MascotPart from "./MascotPart";

export default function MascotCanvas() {

  // const color = useAppSelector((state) => state.background.color)
  // const dispatch = useAppDispatch()

  const mascot = useContext(MascotContext);

  return <div className="mascotPlace" style={{
    flex: 5,
    // height: "100%",
    background: mascot?.mascot.bgColor,
    overflow: "auto",
    margin: 10,
    borderRadius: "10px 0 0 0 ",
  }}
    onDragStart={() => { return false }}
    onDrag={() => { return false }}
  >
    <div className="mascot" style={{
      width: "100%",

      position: "relative"
    }} draggable={false}
      onDragStart={() => { return false }}
      onDrag={() => { return false }}>
      {/* {mascot && mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts.map((c, i) => {
        return c.visibility ? <MascotPart partIndex={i} key={i} /> : <div key={i} />
      }
      )} */}
      {mascot && mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts.map((c, i) => {
        return c.visibility && <MascotPart partIndex={i} key={i} />
      }
      )}
      {/* {mascot && mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts.filter((e: IPart, i) => {
        if (i == )
      }).map((c, i) => {
        return c.visibility ? <MascotPart partIndex={i} key={i} /> : <div key={i} />
      }
      )} */}
    </div>
  </div>
}