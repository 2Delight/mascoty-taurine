import { MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
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

export default function EmotionAdd({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mascot = useContext(MascotContext);

  const [designation, setDesignation] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value);
  };



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
          <a style={{ textAlign: "left", color: "white", width: 100 }}>
            Name
          </a>
          <input style={{ backgroundColor: menuGray, flex: 1 }} placeholder="Name your emotion..." value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}>
          </input>
        </div>
        <div style={{ flexDirection: "row", display: "flex", marginBottom: 10 }}>
          <a style={{ textAlign: "left", color: "white", width: 100 }}>
            Designation
          </a>
          <div style={{ borderRadius: 4, borderWidth: 10, padding: 2, borderColor: "white", backgroundColor: menuGray, flex: 1 }}>
            <Select
              value={designation}
              onChange={handleChange}
              displayEmpty
            >
              {<MenuItem value={0}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Neutral
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.default)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={1}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Anger
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.angry)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={2}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Disgust
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.disgust)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={3}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Fear
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.fear)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={4}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Happiness
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.happy)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={5}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Sadness
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.sad)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={6}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Surprise
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.surprise)} />
                </div>
              </MenuItem>
              }
            </Select>
          </div>
        </div>
        <button style={{ flex: 1, width: "100%" }} onClick={() => {
          if (designation !== "" && name !== "") {
            console.log(EPart[Number(designation)])
            if (mascot) {
              mascot.mascot = structuredClone(mascot.mascot)
              mascot.mascot.emotions.push({
                name: name,
                visibility: true,
                parts: [],
                emotion: Number(designation),
              })
              mascot.setMascot(mascot.mascot)
              handleClose()
            }
          } else {
            alert("Can't Add Emotion Due To Your Irresponsability")
          }
        }}>
          Add Part
        </button>
      </div>
    </Modal>
  );
}