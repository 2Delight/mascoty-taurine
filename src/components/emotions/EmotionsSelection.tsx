import { List, ListItemButton } from "@mui/material";
import React from "react";
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


export default function EmotionsSelection() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        // console.log(index)
    };



    return <div style={{
        flex: 1,
        backgroundColor: menuGray,
        margin: 10,
        borderRadius: "20px"
    }}>
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

            <DeleteOutlineTwoToneIcon className="icon" />
            <CreateTwoToneIcon className="icon" />
            <AddCircleOutlineTwoToneIcon className="icon" />
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
            <ListItemButton selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}>
                <Emotion />
            </ListItemButton >
            <ListItemButton selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}>
                <Emotion />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}>
                <Emotion />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}>
                <Emotion />
            </ListItemButton>
        </List>
    </div>
}
