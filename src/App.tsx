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


export const MascotContext = createContext<{
  mascot: IMascot,
  setMascot: React.Dispatch<React.SetStateAction<IMascot>>
} | null>(null);

export default function App() {
  const [selecting, setSelecting] = useState(true)
  const [mascot, setMascot] = useState<IMascot>({
    emotions: [
      {
        name: "abiba",
        visibility: true,
        parts: [
        ],
        emotion: EEmotion.happy,
      },
      {
        name: "robomuzhikh",
        visibility: false,
        parts: [{
          name: "Eyes_C",
          visibility: true,
          sourcePath: "/pics/eyes_c.png",
          positionX: 100,
          positionY: 100,
          height: 100,
          width: 100,
          type: EPart.eyesClosed
        },
        {
          name: "Eyes_O",
          visibility: true,
          sourcePath: "/pics/eyes_o.png",
          positionX: 0,
          positionY: 0,
          height: 100,
          width: 100,
          type: EPart.eyesOpened
        },
        {
          name: "Face",
          visibility: true,
          sourcePath: "/pics/face.png",
          positionX: 0,
          positionY: 0,
          height: 100,
          width: 100,
          type: EPart.face
        },
        {
          name: "Mouth_C",
          visibility: true,
          sourcePath: "/pics/mouth_c.png",
          positionX: 0,
          positionY: 0,
          height: 100,
          width: 100,
          type: EPart.mouthClosed
        },
        {
          name: "Mouth_O",
          visibility: true,
          sourcePath: "/pics/mouth_o.png",
          positionX: 0,
          positionY: 0,
          height: 100,
          width: 100,
          type: EPart.mouthOpened
        },
        ],
        emotion: EEmotion.angry,
      },
    ],
    bgColor: "black",
    selectedEmotion: 0,
    selectedPart: 0,
  });

  const value = useMemo(
    () => ({ mascot, setMascot }),
    [mascot]
  );

  return (
    <ThemeProvider theme={theme}>
      <MascotContext.Provider value={value}>
        {selecting ? <Projects exit={setSelecting}/> :
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
              {/* 
            <button onClick={() => console.log(mascot)}>

            </button> */}

            </div>
          </div>
        }
      </MascotContext.Provider>
    </ThemeProvider>
  );
}
