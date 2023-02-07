import { SelectChangeEvent, Select, MenuItem } from "@mui/material";
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import React from "react";
import { menuGray } from "../../utils/Colors";
import { get_cams } from "../../utils/Commands";

export default function CamSelection() {
    const [age, setAge] = React.useState('');
    const [cams, setCams] = React.useState(<div />);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };




    const rustCams = get_cams().then((response: any) => response.text()).then((cameras) => console.log(cameras))


    return <div style={{ display: "flex", flexDirection: "row", borderRadius: 10, backgroundColor: menuGray, justifyContent: "center", alignItems: "center", flex: 1, margin: 4 }}>
        <CameraAltTwoToneIcon className="dumbIcon" />
        <div style={{ flex: 4 }}>

            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
            >
                {cams}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>

            </Select>
        </div>
    </div>
}