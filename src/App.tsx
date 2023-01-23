import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

type TMascot = {
  blink: boolean;
  emotion: string;
  lips: boolean;
  voice: number;
}

function App() {
  const [msg, setMsg] = useState("");

  async function get_mascot() {
    setMsg(await invoke("get_mascot", {}));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <div>
          <button type="button" onClick={get_mascot}>
            Get mascot
          </button>
        </div>
      </div>
      <p>{JSON.stringify(msg)}</p>
    </div>
  );
}

export default App;
