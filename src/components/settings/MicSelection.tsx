import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import React from 'react';
import { menuGray } from '../../utils/Colors';

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




export default function MicSelection() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return <div style={{ display: "flex", flexDirection: "row", borderRadius: 10, backgroundColor: menuGray, justifyContent: "center", alignItems: "center", flex: 1, margin: 4 }}>
        <KeyboardVoiceTwoToneIcon className="dumbIcon" />
        <div style={{ flex: 4 }}>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </div>
    </div>
};