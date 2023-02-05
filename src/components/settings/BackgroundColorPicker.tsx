import { Modal } from "@mui/material";
import React from "react";
import { CirclePicker } from "react-color";


export default function MaskotBackgroundColorPicker() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [color, setColor] = React.useState("#fff")


  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flex: 1,
      backgroundColor: "#E6E6E6",
      borderRadius: 10,
      margin: 4,
      justifyContent: "center",
      alignContent: "center",
    }}>
      <a style={{
        margin: 0,
        paddingTop: 4,
        paddingLeft: 10,
        color: "black",
        textAlign: "left",
        flex: 1,
      }}>
        Background Color
      </a>
      <div style={{
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
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // backgroundColor: 'white',
          padding: 4,
        }}>
          <CirclePicker
            color={color}
            onChangeComplete={(clr) => { setColor(clr.hex) }} />


        </div>
      </Modal>
    </div>
  );
}