import { MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BlockPicker, CirclePicker, SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { MascotContext } from "../../App";
import { contextMenuGray, focusBlue, interactGray, menuGray } from "../../utils/Colors";
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

export default function Proceed({ open, setOpen, question, proceed }: { open: boolean, question: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, proceed: () => void }) {
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
        backgroundColor: contextMenuGray,
        border: "solid",
        borderWidth: 3,
        borderColor: focusBlue,
        padding: 20,
        borderRadius: 30,
        width: "30%",
        maxWidth: 400,
        minWidth: 300,
        flexDirection: "column",
        userSelect: "none",
      }}>
        {/* <div style={{ flexDirection: "row", display: "flex", }}> */}
          <a style={{ textAlign: "center", color: menuGray, fontSize: 18,marginBottom: 10  }}>
            {question}
          </a>
        {/* </div> */}

        <div className="msct-button" style={{ marginTop: 20, padding: 3, borderRadius: 10, color: menuGray }}
          onClick={() => {
            proceed()
            setOpen(false)
          }}>
          <a style={{ textAlign: "center", color: menuGray}}>
            Yes
          </a>
        </div>
      </div>
    </Modal>
  );
}