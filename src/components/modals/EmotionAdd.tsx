import { MenuItem, Modal, Select, SelectChangeEvent, Slide } from "@mui/material";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function EmotionAdd({ open, setOpen, redact }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, redact: boolean }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mascot = useContext(MascotContext);

  const [designation, setDesignation] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value);
  };

  useEffect(() => {
    if (redact && mascot) {
      setDesignation(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].emotion + "")
      setName(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].name)
    } else {
      setDesignation("")
      setName("")
    }
  }, [open, redact])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit style={{ transform: 'translate(-50%, -50%)' }}>
        <div
          style={{
            position: "absolute",
            top: '35%',
            left: 'calc(50vw - 200px)',

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
            <div style={{ borderRadius: 4, borderWidth: 10, flex: 1 }}>
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
                    <img style={{ height: 20, aspectRatio: 1 }} src={descriptEmotion(EEmotion.neutral)} />
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

          <div className="msct-button" style={{ marginTop: 20, padding: 3, borderRadius: 10, color: menuGray }}
            onClick={() => {
              if (designation !== "" && name !== "") {
                console.log(EPart[Number(designation)])
                if (mascot) {
                  mascot.mascot = structuredClone(mascot.mascot)
                  if (redact) {
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion] = {
                      name: name,
                      visibility: true,
                      parts: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts,
                      emotion: Number(designation),
                    }
                  } else {
                    mascot.mascot.emotions.push({
                      name: name,
                      visibility: true,
                      parts: [],
                      emotion: Number(designation),
                    })
                    mascot.mascot.selectedEmotion = mascot.mascot.emotions.length - 1
                    console.log("Selected Emotion after ADDITION: " + mascot.mascot.selectedEmotion)
                  }
                  mascot.setMascot(mascot.mascot)
                  handleClose()
                }
              } else {
                if (name === "") {
                  toast.error("Name's empty")
                }
                if (designation === "") {
                  toast.error("Designation's not selected")
                }
              }
            }}>
            Add Part
          </div>
        </div>
      </Slide>
    </Modal>
  );
}