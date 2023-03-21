import { interactGray, menuGray } from "./utils/Colors";
import aboba from "./assets/react.svg"
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useState } from "react";
import { fontSize } from "@mui/system";
import { appLocalDataDir } from '@tauri-apps/api/path';
const appLocalDataDirPath = await appLocalDataDir().then(resp => {
    console.log(resp)
});

export default function Projects() {
    const [searchReq, setSearchReq] = useState("")

    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", width: 200, backgroundColor: "white", height: "100vh" }}>
                <img style={{ flex: 2 }} src={aboba} />
                <div style={{ flex: 1 }} />
                <div style={{ flex: 0, marginBottom: 20, flexDirection: "column" }}>
                    <div style={{ margin: 10, textAlign: "center", padding: 7, borderRadius: 10, border: "solid", borderWidth: 2, borderColor: interactGray, backgroundColor: menuGray }}
                        onClick={() => {

                        }}>
                        Create Mascot
                    </div>
                    <div style={{ margin: 10, textAlign: "center", padding: 7, borderRadius: 10, border: "solid", borderWidth: 2, borderColor: interactGray, backgroundColor: menuGray }}
                        onClick={() => {

                        }}>
                        Open
                    </div>
                </div>
            </div>

            <div style={{ height: "100vh", width: "100%", }}>
                <div style={{ marginInline: 20, marginTop: 10, borderBottom: "solid", borderBottomColor: interactGray, paddingBottom: 5, }}>
                    <SearchTwoToneIcon style={{ width: 25, height: 25, justifySelf: "center", color:interactGray }} />
                    <input style={{color:menuGray, backgroundColor: "transparent", boxShadow: "none", fontSize:16, width:"calc(100% - 100px)"}} placeholder="Search mascots" value={searchReq} onChange={(text) => setSearchReq(text.target.value)}>

                    </input>
                </div>
            </div>

        </div>
    )
}