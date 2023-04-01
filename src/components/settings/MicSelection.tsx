import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { menuGray } from '../../utils/Colors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function useVolumeLevel() {

//     const [level, setLevel] = useState(0);
//     const [isRecording, setIsRecording] = useState(false)
//     const [max, setMax] = useState(0)

//     const stopRecording = () => {
//       setLevel(0)
//       window.soundMeter.stop()
//       setIsRecording(false)
//     }

//     const startRecording = () => {
//       const constraints = window.constraints = {
//         audio: true,
//         video: false
//       };
//       try {
//         window.AudioContext = window.AudioContext || window.webkitAudioContext;
//         window.audioContext = new AudioContext();
//       } catch (e) {
//         toast.error('Web Audio API not supported.');
//       }

//       navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then(handleSuccess)
//         .catch(handleError);

//       setIsRecording(true)
//     }


//     const updateVolume = () => {
//       if (window.soundMeter && isRecording) {
//         let v = window.soundMeter.instant * 200
//         setLevel(Math.min(v, 100))
//         setMax(Math.max(max, level))
//       }
//     }


//     useEffect(() => {
//       let intervalId: string | number | NodeJS.Timeout | undefined
//       intervalId = setInterval(updateVolume, 50)


//       return () => clearInterval(intervalId);
//     });

//     return [startRecording, stopRecording, level];
//   }

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
    analyser.maxDecibels = 20;
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


// function gotSources(sourceInfos: string | any[]) {
//     var audioSelect = document.getElementById("audioinput");
//     if (audioSelect) {
//         while (audioSelect.firstChild)
//             audioSelect.removeChild(audioSelect.firstChild);

//         for (var i = 0; i != sourceInfos.length; ++i) {
//             var sourceInfo = sourceInfos[i];
//             if (sourceInfo.kind === 'audioinput') {
//                 var option = document.createElement("option");
//                 option.value = sourceInfo.id;
//                 option.text = sourceInfo.label || 'input ' + (audioSelect.length + 1);
//                 audioSelect.appendChild(option);
//             }
//         }
//         audioSelect.onchange = changeInput;
//     }
// }

export default function MicSelection() {

    const [age, setAge] = React.useState('');
    const [uga, setUga] = React.useState(-1);
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        } else {
            // List cameras and microphones.
            // navigator.mediaDevices.enumerateDevices().then(gotSources);
            // navigator.mediaDevices
            //   .enumerateDevices()
            //   .then((devices) => {
            //     devices.forEach((device) => {
            //       console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            //     });
            //   })
            //   .catch((err) => {
            //     console.error(`${err.name}: ${err.message}`);
            //   });
        }
    })

    return <div
        style={{
            display: "flex",
            flexDirection: "row",
            borderRadius: 10,
            backgroundColor: menuGray,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            margin: 4
        }}>
        <KeyboardVoiceTwoToneIcon className="dumbIcon" />
        <div style={{ flex: 10 }} />
        <Select
            style={{ maxWidth: 160, minWidth: 160 }}
            value={age}
            onChange={handleChange}
            displayEmpty
        >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {/* <button onClick={() => {setUga(getMicrophoneVolume)}}>
            {uga}
        </button> */}
        {/* <a>{uga}</a>
        <button onClick={()=> {
            setUga(getMicrophoneVolume())
        }}/> */}
    </div>
};