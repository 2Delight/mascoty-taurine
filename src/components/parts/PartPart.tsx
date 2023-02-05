import { useState } from "react";
import { AspectRatio, VolumeDown, VolumeUp } from "@mui/icons-material";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';

export default function PartPart() {
    const [visible, setVisible] = useState(true)

    return <div style={{ display: "flex", flexDirection: "row", width: "100%", borderRadius: "5px", justifyContent: "center", alignItems: "center", }}>
        <a style={{
            margin: 0,
            padding: 0,
            color: "white",
            maxWidth: "200px",
            overflow: "hidden"
        }}>Aboba</a>
        <div style={{
            flex: 4
        }}></div>
        <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }} onClick={() => {
            setVisible(!visible)
            console.log(visible)
        }}>
            {visible && <VisibilityTwoToneIcon className="eye" />}
            {!visible && <VisibilityOffTwoToneIcon className="eye" />}
        </div>


    </div>
}
