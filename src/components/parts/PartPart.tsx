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
import { descriptPart } from "../../utils/EDescriptor";
import up from "../../assets/parts-icons/up.svg"
import down from "../../assets/parts-icons/down.svg"

export default function PartPart({ partIndex, setSelect }: { partIndex: number, setSelect: React.Dispatch<React.SetStateAction<number>>}) {
    const mascot = useContext(MascotContext)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (mascot) {
            setVisible(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility)
        }
    }, [mascot?.mascot])

    return <div style={{ display: "flex", flexDirection: "row", width: "100%", borderRadius: "5px", justifyContent: "center", alignItems: "center", opacity: visible ? 1 : 0.3 }}>
        {mascot && <img src={descriptPart(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].type)} style={{ height: 20, aspectRatio: 1 }} />}
        <a style={{
            marginInline: 10,
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
                if (mascot && partIndex > 0) {
                    mascot.mascot = structuredClone(mascot.mascot)
                    let swp = mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex]
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex] = mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex - 1]
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex - 1] = swp
                    mascot.mascot.selectedPart = partIndex
                    // mascot.mascot.selectedPart = partIndex+1
                    mascot.setMascot(mascot.mascot)
                    // setSelect(partIndex+1)
                }
            }}>
            {mascot && <img src={up} style={{ height: 15, aspectRatio: 1, marginInline: 3 }} />}
        </div>
        <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}
            onClick={() => {
                if (mascot && mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.length - 1 > partIndex) {
                    mascot.mascot = structuredClone(mascot.mascot)
                    let swp = mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex]
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex] = mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex + 1]
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex + 1] = swp
                    // mascot.mascot.selectedPart = partIndex+1
                    mascot.setMascot(mascot.mascot)
                    // setSelect(partIndex+1)
                }
            }}>
            {mascot && <img src={down} style={{ height: 15, aspectRatio: 1, marginInline: 3 }} />}
        </div>
        <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}
            onClick={() => {
                if (mascot) {
                    mascot.mascot = structuredClone(mascot.mascot)
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility = !mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility
                    mascot.setMascot(mascot.mascot)
                }
            }}>
            {mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].visibility ? <VisibilityTwoToneIcon className="eye" /> : <VisibilityOffTwoToneIcon className="eye" />}
        </div>


    </div>
}
