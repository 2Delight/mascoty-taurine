import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

interface IMascot {
  blink: boolean;
  emotion: string;
  lips: boolean;
  voice: number;
}

function getMicrophoneVolume(): number {
  let ans = 0.0;
  navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true
    }
  }).then((stream: MediaStream) => {
    ans = getMicrophoneInfo(stream);
  }).catch(
    function (err) {
      console.log(err);
    }
  );

  return ans;
}

function getMicrophoneInfo(stream: MediaStream): number {
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaStreamSource(stream);

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.minDecibels = -127;
  analyser.maxDecibels = 0;
  analyser.smoothingTimeConstant = 0.4;
  audioSource.connect(analyser);

  const volumes = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(volumes);

  let volumeSum = 0;
  for (const volume of volumes) {
    volumeSum += volume;
  }

  return volumeSum / volumes.length;
}

function App() {
  const [mascot, setMascot] = useState({
    blink: false,
    emotion: "",
    lips: false,
    voice: "",
  });

  async function get_mascot() {
    setMascot(await invoke("get_mascot", {}));

  }

  return (
    <div className="container">

      <img src={"./pics/face.png"} className="image vite" style={{ position: "absolute", top: "100px", zIndex: 1, height: "100%", width: "100%", objectFit: "contain" }} />
      <img src={mascot.blink ? "./pics/eyes_c.png" : "./pics/eyes_o.png"} className="image vite" style={{ position: "absolute", top: "100px", zIndex: 2, height: "100%", width: "100%", objectFit: "contain", }} />
      <img src={mascot.lips ? "./pics/mouth_c.png" : "./pics/mouth_o.png"} className="image vite" style={{ position: "absolute", top: "100px", zIndex: 3, height: "100%", width: "100%", objectFit: "contain", }} />
      <div>
        <button type="button" onClick={get_mascot} style={{ zIndex: 4 }}>
          Get mascot
        </button>
      </div>

      <p>{"BLINK: " + mascot.blink + " | EMOTION: " + mascot.emotion + " |  LIPS: " + mascot.lips + " | VOICE: " + mascot.voice}</p>
    </div>

  );
}

export default App;
