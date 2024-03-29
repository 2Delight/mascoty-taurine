import { MenuItem, Modal, Select, SelectChangeEvent, Slide } from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { MascotContext } from "../../App";
import { contextMenuGray, focusBlue, menuGray } from "../../utils/Colors";
import { descriptPart } from "../../utils/EDescriptor";
import { EPart } from "../logic/EPart";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { open } from "@tauri-apps/api/dialog"
import { getImageSize } from "react-image-size/lib/lib/getImageSize";
import { tauri } from "@tauri-apps/api";
import { copyFile, exists } from '@tauri-apps/api/fs';
import { sep } from "@tauri-apps/api/path";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import generateUUID from "../../utils/UUIDGen";

const handler = async () => {
  let aboba = await open({
    multiple: false,
    filters: [{
      name: 'Image',
      extensions: ['png', 'jpeg', 'jpg']
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
    const dimens = await getImageSize(value)
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
      <Slide direction="down" in={open} mountOnEnter unmountOnExit style={{ transform: 'translate(-50%, -50%)' }}>
        <div
          style={{
            position: "absolute",
            top: '35%',
            left: 'calc(50vw - 200px)',

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
            display: "flex",
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
            <div style={{ borderRadius: 4, borderWidth: 10, flex: 1 }}>
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
          {!redact && <div style={{ flexDirection: "row", display: "flex", marginBottom: 10 }}>
            <a style={{ textAlign: "left", color: "white", width: 100 }}>
              Image
            </a>
            <div style={{ position: "relative", flex: 1, flexDirection: "row", display: "flex", }} onClick={() => {
              handler().then((response) => {
                console.log(response)
                if (!(response instanceof Array<String>) && response) {

                  // let apiPath = tauri.convertFileSrc(response)
                  // console.log('API Path', apiPath)
                  getSizes(tauri.convertFileSrc(response))
                  setPath(response)
                }
              })
            }}>
              <input style={{ backgroundColor: menuGray, flex: 1, paddingRight: 40 }} disabled={true} placeholder="Part's Directory..." value={path} >

              </input>
              <div style={{ position: "absolute", right: 10, top: 5 }}>
                <SearchTwoToneIcon />
              </div>
            </div>

          </div>}
          {path && <img src={
            tauri.convertFileSrc(path)
          } style={{ maxHeight: 100, objectFit: "scale-down", alignSelf: "center", justifySelf: "center" }} />}
          <div className="msct-button" style={{ marginTop: 20, padding: 3, borderRadius: 10, color: menuGray }}
            onClick={() => {
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
                    mascot.setMascot(mascot.mascot)
                    handleClose()
                  } else {
                    // exists(mascot.mascot.workingDir + mascot.mascot.emotions[mascot.mascot.selectedEmotion].name + "_" + EPart[Number(designation)] + "_" + name + ".masset").then((resp) => {
                    if (mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.find((item) => item.name === name)) {
                      toast.warn("Part with same name already exists within this emotion")
                    } else {
                      let id = generateUUID()
                      copyFile(path, mascot.mascot.workingDir + mascot.mascot.emotions[mascot.mascot.selectedEmotion].name + "_" + name + "_" + id + ".masset", {}).then(() => { }).catch((e) => toast.error(e))
                      // let newPath = tauri.convertFileSrc(docsPath + mascot.mascot.workingDir + sep + designation + "_" + name)

                      mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.push({
                        name: name,
                        visibility: true,
                        // sourcePath: "https://asset.localhost/"+path,
                        sourcePath: mascot.mascot.workingDir + mascot.mascot.emotions[mascot.mascot.selectedEmotion].name + "_" + name + "_" + id + ".masset",
                        positionX: 0,
                        positionY: 0,
                        height: height,
                        width: width,
                        type: Number(designation)
                      })
                      mascot.setMascot(mascot.mascot)
                      handleClose()
                    }
                    //   }).catch((e) => { toast.error(e) })
                  }
                }
              } else {
                if (name === "") {
                  toast.error("Name's empty")
                }
                if (designation === "") {
                  toast.error("Designation's not selected")
                }
                if (path === "") {
                  toast.error("No path given")
                }
              }
            }
            }>
            {redact ? "Redact Part" : "Add Part"}
          </div>
        </div>
      </Slide>
    </Modal>
  );
}