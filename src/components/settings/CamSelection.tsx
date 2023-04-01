import { SelectChangeEvent, Select, MenuItem } from "@mui/material";
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import React, { useEffect } from "react";
import { menuGray } from "../../utils/Colors";
import { get_cams } from "../../utils/Commands";

export default function CamSelection() {
    const [camera, setCamera] = React.useState('');
    const [cams, setCams] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setCamera(event.target.value);
    };

    useEffect(() => {
        let aboba: string[]
        get_cams()
            .then((response: any) => aboba = response)
            .then(() => {
                setCams(aboba)
                setCamera(aboba.length > 0 ? aboba[0] : '')
            })
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
        <CameraAltTwoToneIcon className="dumbIcon" />
        <div style={{ flex: 10 }} />
        <Select
            style={{ maxWidth: 160, minWidth:160 }}
            value={camera}
            onChange={handleChange}
            displayEmpty
        >
            {cams.map((c, i) =>
                <MenuItem key={i} value={c}>{c}</MenuItem>
            )}

        </Select>
    </div>
}