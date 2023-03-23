import { MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BlockPicker, CirclePicker, SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { MascotContext } from "../../App";
import { interactActiveGray, interactActiveHoverGray, interactGray, menuGray } from "../../utils/Colors";
import { descriptEmotion, descriptPart } from "../../utils/EDescriptor";
import { EEmotion } from "../logic/EEmotion";
import { EPart } from "../logic/EPart";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { open } from "@tauri-apps/api/dialog"
import { tauri } from "@tauri-apps/api";
import { appWindow } from '@tauri-apps/api/window';
import { readTextFile, BaseDirectory, writeTextFile, createDir } from '@tauri-apps/api/fs';
import { sep } from '@tauri-apps/api/path'
import { DummyMascot } from "../../utils/DummyMascot";

// import { changeColor } from "../../utils/redux_state/BackgroundSlice";

const handler = async () => {
    let aboba = await open({
        multiple: false,
        directory: true,
    });
    return aboba
}

export default function ProjectAdd({ open, setOpen, addProject }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, addProject: (path: string, dir: string, name: string) => void }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const mascot = useContext(MascotContext);

    const [name, setName] = React.useState("");
    const [workDir, setWorkDir] = React.useState("")

    useEffect(() => {
        setName("")
        setWorkDir("")
    }, [open])

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
                backgroundColor: interactActiveGray,
                border: "solid",
                borderWidth: 3,
                borderColor: interactActiveHoverGray,
                padding: 20,
                borderRadius: 30,
                width: "30%",
                maxWidth: 400,
                minWidth: 300,

                flexDirection: "column",
            }}>
                <div style={{ flexDirection: "row", display: "flex", marginBottom: 10 }}>
                    <a style={{ textAlign: "left", color: "white", width: 100 }}>
                        Name
                    </a>
                    <input style={{ backgroundColor: menuGray, flex: 1 }} placeholder="Name Your Project..." value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value);
                    }}>
                    </input>
                </div>
                <div style={{ flexDirection: "row", display: "flex", marginBottom: 10 }}>
                    <a style={{ textAlign: "left", color: "white", width: 100 }}>
                        Base Directory
                    </a>
                    <div style={{ position: "relative", flex: 1, flexDirection: "row", display: "flex", }} onClick={() => {
                        handler().then((response) => {
                            console.log(response)
                            if (!(response instanceof Array<String>) && response) {

                                // let apiPath = tauri.convertFileSrc(response)
                                // console.log('API Path', apiPath)
                                setWorkDir(response)
                            }
                        })
                    }}>
                        <input style={{ backgroundColor: menuGray, flex: 1, paddingRight: 40 }} disabled={true} placeholder="Project's Directory..." value={workDir} />
                        <div style={{ position: "absolute", right: 10, top: 5 }} >
                            <SearchTwoToneIcon />
                        </div>
                    </div>
                </div>
                <div className="msct-button" style={{padding: 7, borderRadius: 10, backgroundColor: menuGray, color:  interactActiveHoverGray , flex: 1}} onClick={() => {
                    createDir(workDir + sep + name).then(() => {
                        // let apiPath = tauri.convertFileSrc(workDir)
                        // let apiPath = tauri.convertFileSrc(workDir + sep + name + ".msc")
                        // console.log('API Path', apiPath)
                        let notSoDummyMascot = DummyMascot
                        notSoDummyMascot.workingDir = workDir + sep + name + sep
                        notSoDummyMascot.projectName = name
                        writeTextFile(workDir + sep + name + sep + "CONF_" + name + ".mascot", JSON.stringify(notSoDummyMascot), { dir: BaseDirectory.Document }).then(() => {
                            addProject("CONF_" + name + ".mascot", workDir + sep + name, name)
                            setOpen(false)
                        }).catch(() => {
                            alert("Can't Create Config File For Project " + name)
                        })
                    }).catch(() => {
                        alert("Project With Same Name Already Exists")
                    })
                }}>
                    Add Project
                </div>
            </div>
        </Modal>
    );
}