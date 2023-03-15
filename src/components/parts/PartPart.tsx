import { useContext, useEffect, useState } from "react";
import { AspectRatio, VolumeDown, VolumeUp } from "@mui/icons-material";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import { MascotContext } from "../../App";
import IPart from "../logic/IPart";
import {descriptPart} from "../../utils/EDescriptor";

export default function PartPart({ partIndex }: { partIndex: number }) {
    const mascot = useContext(MascotContext)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (mascot) {
            setVisible(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility)
        }
    }, [mascot?.mascot])

    return <div style={{ display: "flex", flexDirection: "row", width: "100%", borderRadius: "5px", justifyContent: "center", alignItems: "center", opacity:visible? 1: 0.3 }}>
        {mascot && <img src={descriptPart(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].type)} style={{ height: 20, aspectRatio: 1 }} />}
        <a style={{
            marginInline:10,
            padding: 0,
            color: "white",
            maxWidth: "200px",
            overflow: "hidden"
        }}>{mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].name}</a>
        <div style={{
            flex: 4
        }}></div>
        <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}
            onClick={() => {
                if (mascot) {
                    mascot.mascot = structuredClone(mascot.mascot)
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility = !mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility
                    mascot.setMascot(mascot.mascot)
                }
            }}>
            {mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility?  <VisibilityTwoToneIcon className="eye" />:  <VisibilityOffTwoToneIcon className="eye" />}
        </div>


    </div>
}
