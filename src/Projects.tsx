import { interactGray, menuGray } from "./utils/Colors";
import aboba from "./assets/react.svg"
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useEffect, useState } from "react";
import { fontSize } from "@mui/system";
import { appLocalDataDir } from '@tauri-apps/api/path';
import search from './assets/search.svg'
import ISave from "./components/logic/IConf";
import { exists, readFile } from "fs";
import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';
import { EEmotion } from "./components/logic/EEmotion";
import { EPart } from "./components/logic/EPart";
import IConf from "./components/logic/IConf";
import { textToColor } from "./utils/TextToColor";

export default function Projects({ exit }: { exit: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [dataPath, setDataPath] = useState("")
    const [projects, setProjects] = useState<IConf[] | null>([{
        path: "test.json",
        name: "aboba",
        previewPath: "",
    }, {
        path: "first.json",
        name: "abiba",
        previewPath: "",
    }, {
        path: "second.json",
        name: "govno",
        previewPath: "",
    }])

    useEffect(() => {
        appLocalDataDir().then(resp => {
            setDataPath(resp)
        });
    }, [])

    useEffect(() => {
        loadData()
    }, [dataPath])

    const loadData = async () => {
        if (dataPath === "") {
            return
        }

        console.log("started data loading")
        readTextFile("conf.json", { dir: BaseDirectory.AppLocalData }).then((text) => {
            let a: IConf[] = JSON.parse(text)
            setProjects(a)
            console.log(a)
            console.log("working with dir: " + dataPath)
        }).catch((e) => {
            // alert(e.message)
            writeTextFile("conf.json", JSON.stringify(projects), { dir: BaseDirectory.AppLocalData }).then(() => {
                console.log("wrote file")
            })
        })
    }

    const getProject = (path: string) => {

    }

    const [searchReq, setSearchReq] = useState("")

    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", width: 200, backgroundColor: menuGray, height: "100vh" }}>
                <img style={{ flex: 2 }} src={aboba} />
                <div style={{ flex: 1 }} />
                <div style={{ flex: 0, marginBottom: 20, flexDirection: "column" }}>
                    <div style={{ margin: 10, textAlign: "center", padding: 7, borderRadius: 10, border: "solid", borderWidth: 2, borderColor: interactGray, backgroundColor: interactGray, color: "white" }}
                        onClick={() => {
                            exit(false)
                            console.log("exited")
                        }}>
                        Create Mascot
                    </div>
                    {/* <div style={{ margin: 10, textAlign: "center", padding: 7, borderRadius: 10, border: "solid", borderWidth: 2, borderColor: interactGray, backgroundColor: interactGray, color: "white" }}
                        onClick={() => {

                        }}>
                        Open
                    </div> */}
                </div>
            </div>

            <div style={{ height: "100vh", width: "100%", }}>
                <div style={{
                    marginInline: 20, marginTop: 10, borderBottom: "solid", borderWidth: 1, borderBottomColor: "white", paddingBottom: 5,
                    alignItems: "center", alignContent: "center", justifyContent: "center", justifyItems: "center"
                }}>
                    {/* <SearchTwoToneIcon style={{ width: 25, height: 25, justifySelf: "center", color: interactGray }} /> */}
                    <img src={search} style={{ width: 15, aspectRatio: 1, color: interactGray, }} />
                    <input style={{ color: menuGray, backgroundColor: "transparent", boxShadow: "none", fontSize: 14, width: "calc(100% - 100px)" }} placeholder="Search mascots" value={searchReq} onChange={(text) => setSearchReq(text.target.value)}>

                    </input>
                </div>


                <div style={{
                    overflow: "auto",
                    margin: 40,
                }}>
                    {projects?.map((c, i) =>
                        <div key={i} style={{ marginBottom: 20, flexDirection: "row", display: "flex", width: "100%", borderRadius:10,backgroundColor:"red" }}>
                            <img src={c.previewPath} alt={c.name.substring(0, 2)} style={{ marginRight: 20, fontSize: 30, textAlign: "center", alignSelf: "center", justifySelf: "center", backgroundColor: textToColor(c.name), width: 50, aspectRatio: 1, border: "solid", borderRadius: 10, borderColor: "gray", borderWidth: 2, padding: 3, }} />
                            <div style={{ flexDirection: "column" }}>
                                <div style={{ color: menuGray, fontSize: 20, marginTop:4, marginBottom: 2, }}>
                                    {c.name}
                                </div>
                                <div style={{ color: interactGray, fontSize: 12, }}>
                                    {c.path}
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>

        </div>
    )
}