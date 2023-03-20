import { List, ListItemButton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AspectRatio, VolumeDown, VolumeUp } from "@mui/icons-material";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import Emotion from "./EmotionPart";
import { interactGray, menuGray } from "../../utils/Colors";
import { MascotContext } from "../../App";
import EmotionAdd from "../modals/EmotionAdd";


export default function EmotionsSelection() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [openAdd, setOpenAdd] = React.useState(false)
    const [useRedact, setUseRedact] = React.useState(false)

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        if (mascot) {
            mascot.mascot = structuredClone(mascot.mascot)
            mascot.mascot.selectedEmotion = index;
            console.log("selected Emotion after INTERACTION: " + index)
            mascot.setMascot(mascot.mascot)
        }
        // console.log(index)
    };

    const mascot = useContext(MascotContext)

    useEffect(() => {
        if (mascot) {
            setSelectedIndex(mascot.mascot.selectedEmotion)
        }
    }, [mascot?.mascot.selectedEmotion])



    return <div style={{
        flex: 1,
        backgroundColor: menuGray,
        margin: 10,
        borderRadius: "20px"
    }}>
        <EmotionAdd open={openAdd} setOpen={setOpenAdd} redact={useRedact} />
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
            }}>Emotions</a>
            <div style={{
                flex: 5
            }}></div>

            <DeleteOutlineTwoToneIcon className="icon" onClick={() => {
                if (mascot && mascot.mascot.emotions.length > 0) {
                    mascot.mascot = structuredClone(mascot.mascot)
                    mascot.mascot.emotions.splice(mascot.mascot.selectedEmotion, 1)
                    mascot.mascot.selectedEmotion = mascot.mascot.emotions.length - 1
                    console.log("Selected Emotion after DELETE: " + mascot.mascot.selectedEmotion)
                    mascot.setMascot(mascot.mascot)
                }
            }} />
            <CreateTwoToneIcon className="icon" onClick={() => {
                if (mascot && mascot.mascot.emotions.length > 0) {
                    setUseRedact(true)
                    setOpenAdd(true)
                }
            }} />
            <AddCircleOutlineTwoToneIcon className="icon" onClick={() => {
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
            {mascot && mascot?.mascot.emotions.map((c, i) =>
                <ListItemButton selected={selectedIndex === i}
                    key={i}
                    onClick={(event) => handleListItemClick(event, i)}>
                    <Emotion emotionIndex={i} />
                </ListItemButton >
            )}
        </List>
    </div>
}
