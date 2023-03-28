import { List, ListItemButton } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { AspectRatio, VolumeDown, VolumeUp } from "@mui/icons-material";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import PartPart from "./PartPart";
import { interactGray, menuGray } from "../../utils/Colors";
import { MascotContext } from "../../App";
import PartAdd from "../modals/PartAdd";


export default function PartsSelection() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [openAdd, setOpenAdd] = React.useState(false)
    const [useRedact, setUseRedact] = React.useState(false)

    const handleListItemClick = (
        event: any,
        index: number,
    ) => {
        setSelectedIndex(index);
        // console.log(index)
        if (mascot) {
            mascot.mascot = structuredClone(mascot.mascot)
            mascot.mascot.selectedPart = index;
            mascot.setMascot(mascot.mascot)
        }
    };

    const mascot = useContext(MascotContext)

    return <div style={{
        flex: 1,
        backgroundColor: menuGray,
        margin: 10,
        borderRadius: "20px"
    }}>
        <PartAdd open={openAdd} setOpen={setOpenAdd} redact={useRedact} />
        <div style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "green",
            marginRight: 10,
            marginLeft: 15,
            marginTop: 4,
            marginBottom: 4,
        }}>
            <div style={{
                flex: 0
            }}></div>
            <a style={{
                margin: 0,
                padding: 0,
                minWidth: 100,
            }}>Mascot Parts</a>
            <div style={{
                flex: 5
            }}></div>

            <DeleteOutlineTwoToneIcon className="icon" onClick={() => {
                if (mascot && mascot.mascot.emotions.length > 0 && mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.length > 0) {
                    mascot.mascot = structuredClone(mascot.mascot)
                    mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.splice(mascot.mascot.selectedPart, 1)
                    mascot.setMascot(mascot.mascot)
                }
            }} />
            <CreateTwoToneIcon className="icon" onClick={() => {
                if (mascot && mascot.mascot.emotions.length > 0 && mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts.length > 0) {
                    setUseRedact(true)
                    setOpenAdd(true)
                }
            }} />
            <AddCircleOutlineTwoToneIcon className="icon" onClick={() => {
                if (mascot && mascot.mascot.emotions.length > 0)
                    setUseRedact(false)
                setOpenAdd(true)
            }} />
            <div style={{
                flex: 0
            }}></div>
        </div>

        <List sx={{
            width: '100%',
            bgcolor: interactGray,
            overflow: 'auto',
            height: "calc(50vh - 68px)",
            borderRadius: "0px 0px 0px 20px"
            //  '& ul': { padding: 0 },
        }}>
            {mascot && mascot.mascot.emotions.length > 0 && mascot?.mascot.emotions[mascot.mascot.selectedEmotion]?.parts?.map((c, i) =>
                <ListItemButton selected={selectedIndex === i}
                    key={i}
                    onClick={(event) => handleListItemClick(event, i)}>
                    <PartPart partIndex={i} setSelect = {setSelectedIndex}/>
                </ListItemButton >
            )}
            {/* <ListItemButton selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}>
                <PartPart />
            </ListItemButton >
            <ListItemButton selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}>
                <PartPart />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}>
                <PartPart />s
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}>
                <PartPart />
            </ListItemButton> */}
        </List>
    </div>
}
