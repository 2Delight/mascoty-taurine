import { MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BlockPicker, CirclePicker, SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { MascotContext } from "../../App";
import { interactGray, menuGray } from "../../utils/Colors";
import { descriptEmotion, descriptPart } from "../../utils/EDescriptor";
import { EEmotion } from "../logic/EEmotion";
import { EPart } from "../logic/EPart";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { open } from "@tauri-apps/api/dialog"
// import { changeColor } from "../../utils/redux_state/BackgroundSlice";


const handler = async () => {
  let aboba = await open({
    multiple: false,
    filters: [{
      name: 'Image',
      extensions: ['png', 'jpeg']
    }]
  });
  return aboba
}

export default function Proceed({ open, setOpen,question, proceed}: { open: boolean, question:string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, proceed: () => void}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <div style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: interactGray,
        borderRadius: 30,
        width: "30%",
        // height: "40%",
        minWidth: 300,
        padding: 40,
        flexDirection: "column",
      }}>
        <div style={{ flexDirection: "row", display: "flex", marginBottom: 10 }}>
          <a style={{ textAlign: "left", color: "white", fontSize:18}}>
            {question}
          </a>
        </div>
        
        <button style={{ flex: 1, width: "100%" }} onClick={() => {
          proceed()
          setOpen(false)
        }}>
          Yes
        </button>
      </div>
    </Modal>
  );
}