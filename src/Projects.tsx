import { contextButtonGray, contextMenuGray, interactActiveGray, interactActiveHoverGray, interactGray, interactHoverGray, menuGray } from "./utils/Colors";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useEffect, useState, useContext } from "react";
import { fontSize } from "@mui/system";
import { documentDir } from '@tauri-apps/api/path';
import search from './assets/search.svg'
import ISave from "./components/logic/IConf";
import { exists, readFile } from "fs";
import { readTextFile, BaseDirectory, writeTextFile, removeDir, createDir } from '@tauri-apps/api/fs';
import { EEmotion } from "./components/logic/EEmotion";
import { EPart } from "./components/logic/EPart";
import IConf from "./components/logic/IConf";
import { textToColor } from "./utils/TextToColor";
import ProjectAdd from "./components/modals/ProjectAdd";
import { sep } from '@tauri-apps/api/path'
import { MascotContext } from "./App";
import IMascot from "./components/logic/IMascot";
import { appWindow } from "@tauri-apps/api/window";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import Proceed from "./components/modals/Proceed";
import { tauri } from "@tauri-apps/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import blankPreview from './assets/blank_project.png'
import aboba from "./assets/mascoty-logo-nobg.svg"
import logo from "./assets/mascoty_logo_inline.png"


export default function Projects({ exit, }: { exit: React.Dispatch<React.SetStateAction<boolean>> }) {
    const mascot = useContext(MascotContext);

    const [dataPath, setDataPath] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [openProceed, setOpenProceed] = useState(false)
    const [projects, setProjects] = useState<IConf[] | null>(null)

    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        documentDir().then(resp => {
            createDir(resp + "MASCOTY").then(() => {
                setDataPath(resp + "MASCOTY" + sep)
                console.log(resp + "MASCOTY" + sep)
            }).catch(() => {
                setDataPath(resp + "MASCOTY" + sep)
                console.log(resp + "MASCOTY" + sep)
            })
        });
        appWindow.setTitle("Mascoty")
    }, [])

    useEffect(() => {
        loadData()
    }, [dataPath])

    const loadData = async () => {
        if (dataPath === "") {
            return
        }

        console.log("started data loading")
        readTextFile(dataPath + "conf.json").then((text) => {
            let a: IConf[] = JSON.parse(text)
            setProjects(a)
            console.log(a)
            console.log("working with dir: " + dataPath)
        }).catch((e) => {
            alert(e)
            writeTextFile(dataPath + "conf.json", JSON.stringify(projects)).then(() => {
                console.log("created config")
            }).catch((e) => alert(e))
        })
    }

    const addProject = (path: string, dir: string, name: string) => {
        alert("ADD")
        let newProjects: IConf[] | null = projects
        if (!newProjects) {
            newProjects = []
        }
        newProjects?.push({ name: name, path: dir, previewPath: dir + sep + "preview_" + name + ".png" })
        setProjects(newProjects)
        writeTextFile(dataPath + "conf.json", JSON.stringify(newProjects)).then(() => {
            console.log("updated config")
            loadData()
        })
    }

    const setProject = (proj: IConf) => {
        readTextFile(proj.path + sep + "CONF_" + proj.name + ".mascot").then((text) => {
            try {
                let msct: IMascot = JSON.parse(text)
                appWindow.setTitle(msct.projectName + " (~" + msct.workingDir + "~)")
                mascot?.setMascot(msct)
                exit(false)
            } catch (e) {
                alert(e)
            }
        }).catch(() => {
            alert("Can't locate config file for " + proj.name)
            if (projects)
                setDeleteProj(projects.findIndex(item => item === proj))
            setOpenProceed(true)
        })
        return true
    }

    const [searchReq, setSearchReq] = useState("")

    const [deleteProj, setDeleteProj] = useState(-1)

    const deleteProject = () => {
        if (deleteProj !== -1 && projects) {
            removeDir(projects[deleteProj].path, { dir: BaseDirectory.Document, recursive: true }).catch(() => { })
            projects.splice(deleteProj, 1)
            writeTextFile(dataPath + "conf.json", JSON.stringify(projects)).then(() => {
                console.log("Deleted")
                loadData()
                setSelected(-1)
            })
        }
    }

    return (<>
        <ProjectAdd open={openDialog} setOpen={setOpenDialog} addProject={addProject} />
        <Proceed open={openProceed} setOpen={setOpenProceed} question={(projects && deleteProj > -1 && deleteProj < projects.length) ? "Do you want to delete " + projects[deleteProj].name + "?" : ""} proceed={deleteProject} />
        <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ height: "100vh", minWidth: 230, width: 230, backgroundColor: contextMenuGray, alignItems: "center", alignContent: "center" }}>
                <img src={logo} style={{ width: 200, alignSelf: "center", marginInline: 15, marginTop: 10, marginBottom: 10, }} />
                <div style={{ flex: 0, marginBottom: 20, flexDirection: "column" }}>
                    <div className="msct-button" style={{ margin: 10, padding: 7, borderRadius: 10, color: menuGray }}
                        onClick={() => {
                            setOpenDialog(true)
                            console.log("exited")
                        }}>
                        Create
                    </div>
                    <div className="msct-button" style={{ margin: 10, padding: 7, borderRadius: 10, color: menuGray }}
                        onClick={() => {
                            if (projects && selected > -1 && selected < projects.length) {
                                setProject(projects[selected])
                            } else {
                                toast.warn("Project is not selected!");
                            }
                        }}>
                        Open
                    </div>
                    <div className="msct-button" style={{ margin: 10, padding: 7, borderRadius: 10, color: menuGray }}
                        onClick={() => {
                            if (projects && selected > -1 && selected < projects.length) {
                                setDeleteProj(selected)
                                setOpenProceed(true)
                            } else {
                                toast.warn("Project is not selected!");
                            }
                        }}>
                        Delete
                    </div>
                    {/* <div style={{ margin: 10, textAlign: "center", padding: 7, borderRadius: 10, border: "solid", borderWidth: 2, borderColor: interactGray, backgroundColor: interactGray, color: "white" }}
                        onClick={() => {

                        }}>
                        Open
                    </div> */}
                </div>
                {/* <div style={{ flex: 1 }} /> */}
            </div>

            <div style={{ height: "100vh", width: "100%", backgroundColor: menuGray }}>
                <div style={{
                    marginInline: 20, marginTop: 10, borderBottom: "solid", borderWidth: 2, borderBottomColor: interactHoverGray, paddingBottom: 5,
                    alignItems: "center", alignContent: "center", justifyContent: "center", justifyItems: "center"
                }}>
                    <SearchTwoToneIcon style={{ width: 20, height: 20, justifySelf: "center", color: interactActiveHoverGray }} />
                    {/* <img src={search} style={{ width: 15, aspectRatio: 1,}} /> */}
                    <input style={{ backgroundColor: "transparent", boxShadow: "none", fontSize: 14, width: "calc(100% - 100px)" }} placeholder="Search mascots" value={searchReq} onChange={(text) => setSearchReq(text.target.value)}>

                    </input>
                </div>


                <div style={{
                    overflowY: "auto",
                    margin: 20,
                    height: "85%"
                }}>
                    {projects?.map((c, i) => {
                        return c.name.includes(searchReq) && <div key={i} className={i === selected ? "selected-project" : "project"} style={{ marginBottom: 10, padding: 10, flexDirection: "row", display: "flex", width: "calc(100%-40px)", borderRadius: 10, }}
                            onDoubleClick={() => {
                                setProject(c)
                            }} onClick={() => {
                                setSelected(i)
                            }}>
                            <img src={tauri.convertFileSrc(c.previewPath)} alt={c.name.substring(0, 2)} onError={(event) => {
                                (event.target as HTMLImageElement).src = blankPreview
                            }}
                                style={{
                                    objectFit: 'fill',
                                    margin: 3,
                                    marginRight: 20,
                                    fontSize: 30,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    justifySelf: "center",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    backgroundColor: textToColor(c.name),
                                    width: 50,
                                    aspectRatio: 1,
                                    border: "solid",
                                    borderRadius: 10,
                                    borderColor: interactActiveHoverGray,
                                    borderWidth: 2,
                                }} />
                            <div style={{ flexDirection: "column" }}>
                                <div style={{ color: interactActiveHoverGray, fontSize: 20, marginTop: 4, marginBottom: 2, }}>
                                    {c.name}
                                </div>
                                <div style={{ color: interactActiveHoverGray, fontSize: 12, }}>
                                    {c.path}
                                </div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div style={{ height: "100%", marginRight: 20, aspectRatio: 1, alignSelf: "center" }} onClick={() => {
                                setDeleteProj(i)
                                setOpenProceed(true)
                            }}>
                                <DeleteOutlineTwoToneIcon style={{ height: 25, width: 25 }} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
    )
}