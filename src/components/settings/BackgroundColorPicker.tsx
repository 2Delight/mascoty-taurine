import { Modal } from "@mui/material";
import React, { useContext } from "react";
import { BlockPicker, CirclePicker, SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { MascotContext } from "../../App";
import { menuGray } from "../../utils/Colors";
import { EEmotion } from "../logic/EEmotion";
// import { changeColor } from "../../utils/redux_state/BackgroundSlice";


export default function MaskotBackgroundColorPicker() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [color, setColor] = React.useState("black")

  // const dispatch = useDispatch()

  const mascot = useContext(MascotContext);

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flex: 1,
      backgroundColor: menuGray,
      borderRadius: 10,
      margin: 4,
      justifyContent: "center",
      alignContent: "center",
      position: "relative"
    }}>
      <a style={{
        margin: 0,
        paddingTop: 4,
        paddingLeft: 10,
        textAlign: "left",
        flex: 1,
      }}>
        Background Color
      </a>
      <div className="bgButt" style={{
        margin: 6,
        backgroundColor: color,
        minHeight: 17,
        minWidth: 17,
        borderRadius: "6px",
        borderColor: "black",
        border: "2px solid black"
      }} onClick={handleOpen}>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{
          position: "absolute",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // backgroundColor: 'white',
          // padding: 4,
        }}>
          <SketchPicker
            disableAlpha={true}
            presetColors={['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']}
            color={color}
            onChangeComplete={(clr) => {
              setColor(clr.hex)
              if (mascot) {
                mascot.mascot = structuredClone(mascot.mascot)
                mascot.mascot.bgColor = clr.hex
                mascot.setMascot(mascot.mascot)
              }
              // dispatch(changeColor(clr.hex))
              // console.log("changed")
            }} />


        </div>
      </Modal>
    </div>
  );
}