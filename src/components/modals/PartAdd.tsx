import { MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BlockPicker, CirclePicker, SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { MascotContext } from "../../App";
import { interactGray, menuGray } from "../../utils/Colors";
import { descriptPart } from "../../utils/EDescriptor";
import { EEmotion } from "../logic/EEmotion";
import { EPart } from "../logic/EPart";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { open } from "@tauri-apps/api/dialog"
import { useImageSize } from "react-image-size";
import { getImageSize } from "react-image-size/lib/lib/getImageSize";
// import { changeColor } from "../../utils/redux_state/BackgroundSlice";
import { tauri } from "@tauri-apps/api";


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

export default function PartAdd({ open, setOpen, redact }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, redact: boolean }) {
  const handleClose = () => setOpen(false);

  const mascot = useContext(MascotContext);
  const [path, setPath] = useState("")
  const [designation, setDesignation] = React.useState("");
  const [name, setName] = React.useState("");
  const [height, setHeight] = React.useState(100)
  const [width, setWidth] = React.useState(100)

  const handleChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value);
  };

  useEffect(() => {
    if (redact && mascot) {
      setPath(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[mascot.mascot.selectedPart].sourcePath)
      setDesignation(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[mascot.mascot.selectedPart].type + "")
      setName(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[mascot.mascot.selectedPart].name)
    } else {
      setPath("")
      setDesignation("")
      setName("")
    }
  }, [open, redact])

  const getSizes = async (value: string) => {
    const dimens = await getImageSize("https://asset.localhost/" + value)
    if (dimens) {
      setHeight(dimens.height)
      setWidth(dimens.width)
      console.log("pic dimensions: " + dimens.height + " " + dimens.width)
    }
  }


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
          <input style={{ backgroundColor: menuGray, flex: 1 }} placeholder="Name your part..." value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
              {<MenuItem value={1}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Face
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptPart(EPart.face)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={2}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Opened Eyes
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptPart(EPart.eyesOpened)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={3}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Closed Eyes
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptPart(EPart.eyesClosed)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={4}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Opened Mouth
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptPart(EPart.mouthOpened)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={5}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Closed Mouth
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptPart(EPart.mouthClosed)} />
                </div>
              </MenuItem>
              }
              {<MenuItem value={6}>
                <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
                  <a style={{ color: "white", textAlign: "right", alignSelf: "center" }}>
                    Background
                  </a>
                  <div style={{ flex: 1 }} />
                  <img style={{ height: 20, aspectRatio: 1 }} src={descriptPart(EPart.background)} />
                </div>
              </MenuItem>
              }
            </Select>
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex", marginBottom: 10 }}>
          <a style={{ textAlign: "left", color: "white", width: 100 }}>
            Image
          </a>
          <div style={{ position: "relative", flex: 1, flexDirection: "row", display: "flex", }}>
            <input style={{ backgroundColor: menuGray, flex: 1, paddingRight: 40 }} disabled={true} placeholder="Press search icon   -->" value={path} >

            </input>
            <div style={{ position: "absolute", right: 10, top: 5 }} onClick={() => {
              // if (inputFile.current) {
              //   inputFile.current.click();
              // }
              handler().then((response) => {
                console.log(response)
                if (!(response instanceof Array<String>) && response) {
                  getSizes(response)
                  let apiPath = tauri.convertFileSrc(response)
                  console.log('API Path', apiPath)
                  setPath(apiPath)
                }
              })
            }}>
              <SearchTwoToneIcon />
              {/* <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }} /> */}
            </div>
          </div>
        </div>
        {path && <img src={
          // "https://asset.localhost/" + 
          path
        } style={{ maxHeight: 100, flex: 1, objectFit: "scale-down" }} />}
        <button style={{ flex: 1, width: "100%" }} onClick={() => {
          if (designation !== "" && name !== "" && path !== "") {
            console.log(EPart[Number(designation)])
            if (mascot) {
              mascot.mascot = structuredClone(mascot.mascot)
              if (redact) {
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[mascot.mascot.selectedPart] = {
                  name: name,
                  visibility: true,
                  sourcePath: path,
                  positionX: 0,
                  positionY: 0,
                  height: height,
                  width: width,
                  type: Number(designation)
                }
              } else {
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.push({
                  name: name,
                  visibility: true,
                  // sourcePath: "https://asset.localhost/"+path,
                  sourcePath: path,
                  positionX: 0,
                  positionY: 0,
                  height: height,
                  width: width,
                  type: Number(designation)
                })
              }
              mascot.setMascot(mascot.mascot)
              handleClose()
            }
          } else {
            alert("Can't Add Part Due To Your Irresponsability")
          }
        }}>
          {redact ? "Redact Part" : "Add Part"}
        </button>
      </div>
    </Modal>
  );
}