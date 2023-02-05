import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { ThemeProvider} from "@mui/material";
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


export default function App() {
  const [mascot, setMascot] = useState({
    blink: false,
    emotion: "",
    lips: false,
    voice: "",
  });

  const [bgColor, setBgColor] = useState("white")

  async function get_mascot() {
    setMascot(await invoke("get_mascot", {}));

  }

  return (
    <ThemeProvider theme={theme}>
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
            <EmotionsSelection/>
            <PartsSelection/>
          </div>

          <div className="settings" style={{
            justifyContent: "center",
            minWidth: 400,
            flex: 2,
          }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <MicSelection />
                <CamSelection />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <ShakeSettings />
              <FPSSElection />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <MicMinMaxDisplay />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <MaskotBackgroundColorPicker/>
              <div style={{ flex: 1 }}></div>
            </div>

          </div>

          <MascotCanvas/>

        </div>
      </div>
    </ThemeProvider>
  );
}
