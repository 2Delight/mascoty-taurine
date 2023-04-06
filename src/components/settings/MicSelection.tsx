import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { menuGray } from '../../utils/Colors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_mics, set_mics } from '../../utils/Commands';

export default function MicSelection() {
    const [mic, setMic] = React.useState('');
    const [mics, setMics] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setMic(event.target.value);
        set_mics(mics.indexOf(event.target.value)).catch((ex) => alert(ex))
    };

    useEffect(() => {
        let aboba: string[]
        get_mics()
            .then((response: any) => aboba = response)
            .then(() => {
                // alert(aboba)
                // aboba = aboba.map(item => item = item.substring(item.indexOf("(") + 1, item.lastIndexOf(")")))
                setMics(aboba)
                setMic(aboba.length > 0 ? aboba[0] : '')
            }).catch((ex) => alert(ex))
    }, [])

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
            value={mic}
            onChange={handleChange}
            displayEmpty
        >
            {mics.map((c, i) =>
                <MenuItem key={i} value={c}>{c}</MenuItem>
            )}
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