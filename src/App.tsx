import { createContext, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import EmotionsSelection from "./components/emotions/EmotionsSelection";
import MaskotBackgroundColorPicker from "./components/settings/BackgroundColorPicker";
import MicMinMaxDisplay from "./components/settings/MicMinMaxDisplay";
import ShakeSettings from "./components/settings/ShakeSettings";
import MicSelection from "./components/settings/MicSelection";
import CamSelection from "./components/settings/CamSelection";
import FPSSElection from "./components/settings/FPSSelection";
import MascotCanvas from "./components/mascot/MascotCanvas";
import { theme } from "./utils/MuiTheme";
import PartsSelection from "./components/parts/PartsSelection";
import IMascot from "./components/logic/IMascot";
import { EEmotion } from "./components/logic/EEmotion";
import { ThemeContext } from "@emotion/react";
import { EPart } from "./components/logic/EPart";
import Projects from "./Projects";
import { DummyMascot } from "./utils/DummyMascot";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { BaseDirectory, sep } from "@tauri-apps/api/path";
import saveMascot from "./utils/Save";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contextMenuGray, interactActiveGray, interactActiveHoverGray, interactGray, menuGray } from "./utils/Colors";
import logo from "./assets/mascoty_logo_inline.png"
import { BorderColor } from "@mui/icons-material";
import { transform } from "html2canvas/dist/types/css/property-descriptors/transform";
import up from "./assets/parts-icons/up.svg"


export const MascotContext = createContext<{
  mascot: IMascot,
  setMascot: React.Dispatch<React.SetStateAction<IMascot>>
} | null>(null);

export const ProjectContext = createContext<{
  project: IMascot,
  setProject: React.Dispatch<React.SetStateAction<IMascot>>
} | null>(null);


export default function App() {
  const [selecting, setSelecting] = useState(true)
  const [mascot, setMascot] = useState<IMascot>(DummyMascot);
  const [contextVisible, setContextVisible] = useState(true)

  const value = useMemo(
    () => ({ mascot, setMascot }),
    [mascot]
  );

  return (
    <ThemeProvider theme={theme}>
      <MascotContext.Provider value={value}>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
        {selecting ? <Projects exit={setSelecting} /> :
          <div className="container" style={{
            margin: 0
          }}>

            <img className="selector" src={up} style={{position: "absolute", height:20, aspectRatio:1, left:-10, top:"calc(50vh-30)", alignSelf: "center", margin: 10,  }} />

            <div className="context-menu" style={{
              position: "absolute", height: "100vh", width: 230, left: 0
              // backgroundColor: contextMenuGray,
              // borderRight: "solid",
              // borderRightWidth: 3, borderColor: interactActiveHoverGray,
            }}
            >
              <img src={logo} style={{ width: 200, alignSelf: "center", margin: 10, }} />
              <div className="msct-button" style={{ margin: 10, padding: 7, borderRadius: 10, color: menuGray }}
                onClick={() => {
                  saveMascot(mascot).then(() => toast.success("Project saved")).catch((e) => toast.warn("Project can not be saved due to: " + e))
                }}>
                Save
              </div>
              <div className="msct-button" style={{ margin: 10, padding: 7, borderRadius: 10, color: menuGray }}
                onClick={() => {
                  setSelecting(true)
                  setContextVisible(false)
                }}>
                Go To Projects
              </div>
            </div>



            <div className="main" style={{
              height: "100vh"
            }}>
              <div className="emotionsNparts" style={{
                justifyContent: "center",
                overflow: "block",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingLeft: 10,
              }}>
                <EmotionsSelection />
                <PartsSelection />
              </div>

              <div className="settings" style={{
                justifyContent: "center",
                minWidth: 200,
                marginTop: 8,
                flex: 0,
              }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <MicSelection />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <CamSelection />
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ShakeSettings />
                  {/* <FPSSElection /> */}
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <MicMinMaxDisplay />
                </div>


                <div style={{ display: "flex", flexDirection: "row" }}>
                  <MaskotBackgroundColorPicker />
                  {/* <div style={{ flex: 1 }}></div> */}
                </div>
              </div>

              <MascotCanvas />
            </div>
          </div>
        }
      </MascotContext.Provider>
    </ThemeProvider>
  );
}
