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
            <div className="main" style={{
              height: "100vh"
            }}>
              <div className="emotionsNparts" style={{
                justifyContent: "center",
                overflow: "block",
                display: "flex",
                flexDirection: "column",
                flex: 1,
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

              <button onClick={() => {
                saveMascot(mascot).then(() => toast.success("Project saved")).catch((e) => toast.warn("Project can not be saved due to: " + e))
              }}>

              </button>

            </div>
          </div>
        }
      </MascotContext.Provider>
    </ThemeProvider>
  );
}
