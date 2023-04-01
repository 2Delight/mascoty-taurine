import { useContext, useEffect, useRef, useState } from "react";
import { MascotContext } from "../../App";
import { contextMenuGray, interactGray, menuGray } from "../../utils/Colors";
import diagArrows from "../../assets/resize.svg"
import Draggable from "react-draggable";
import { tauri } from "@tauri-apps/api";
import { getImageSize } from "react-image-size";
import { Collapse, Fade, Grow, Slide, Zoom } from "@mui/material";
import IPart from "../logic/IPart";

export default function ShadowPart({ part, emoVisible, zoom }: { part: IPart, emoVisible: boolean, zoom: number }) {
    const [currentPos, setCurrentPos] = useState({ x: -1, y: -1 })
    const [height, setHeight] = useState(100)
    const [width, setWidth] = useState(100)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setCurrentPos({
            x: part.positionX * zoom / 100,
            y: part.positionY * zoom / 100
        })
        setHeight(part.height * zoom / 100)
        setWidth(part.width * zoom / 100)
        // setLoading(false)

        setLoading(false)
    }, [
        zoom, part
    ])

    return (!loading ?
        <div style={{
            display: emoVisible ? part.visibility ? "inline" : "none" : "none",
            zIndex: 1,
            userSelect: "none",
            pointerEvents: "none"
        }} draggable={false}
        >
            <div style={{
                top: currentPos.y,
                left: currentPos.x,
                position: "absolute",
                userSelect: "none",
            }} draggable={false}
            >
                <img src={tauri.convertFileSrc(part.sourcePath)}
                    crossOrigin='anonymous'
                    style={{
                        objectFit: 'fill',
                        height: height,
                        width: width,
                    }}
                    draggable={false}
                />
            </div>
        </div>
        : <div />)
}