import { Zoom } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { MascotContext } from "../../App";
import { contextMenuGray, focusBlue, focusOrange, interactGray, menuGray } from "../../utils/Colors";

const maxW = 160
const barW = 20

const normToNums = (val: number) => {
    return Math.floor(val / 100 * (maxW))
}
const numsToNorm = (val: number) => {
    return Math.floor(val / (maxW) * 100)
}


export default function TwoSlider() {
    const mascot = useContext(MascotContext);
    const [currentPosMin, setCurrentPosMin] = useState(0)
    const [currentPosMax, setCurrentPosMax] = useState(maxW)

    const [dragMin, setDragMin] = useState(false)
    const [dragMax, setDragMax] = useState(false)

    useEffect(() => {
        if (mascot) {
            setCurrentPosMin(normToNums(mascot.mascot.minMic))
            setCurrentPosMax(normToNums(mascot.mascot.maxMic))
        }
    }, [])

    const handleStopMin = (event: any, dragElement: { x: any; y: any; }) => {
        console.log("moved")
        setCurrentPosMin(dragElement.x)
        if (mascot) {
            mascot.mascot = structuredClone(mascot.mascot)
            mascot.mascot.minMic = numsToNorm(dragElement.x)
            mascot.setMascot(mascot.mascot)
        }
    };

    const handleStopMax = (event: any, dragElement: { x: any; y: any; }) => {
        console.log("moved")
        setCurrentPosMax(dragElement.x)
        if (mascot) {
            mascot.mascot = structuredClone(mascot.mascot)
            mascot.mascot.maxMic = numsToNorm(dragElement.x)
            mascot.setMascot(mascot.mascot)
        }
    };

    return (
        <div style={{ position: "relative", width: barW + maxW, marginBlock: 10, justifySelf: "center", alignSelf: "center", }}>
            <Zoom in={dragMin} mountOnEnter unmountOnExit>
                <div style={{ zIndex: 999, position: "absolute", top: 6, left: currentPosMin + barW / 2, opacity: 0.9 }}>
                    <div style={{ position: "absolute", left: "calc(50% - 5px)", top: -15, backgroundColor: contextMenuGray, height: 10, aspectRatio: 1, transform: "rotate(45deg)", borderRadius: 2, }}>
                    </div>
                    <div style={{ textAlign: "center", position: "absolute", top: -40, width: 20, zIndex: 40, backgroundColor: contextMenuGray, borderRadius: 4, paddingInline: 3, padding: 4, color: "white", transform: "translateX(-50%)" }}>
                        {numsToNorm(currentPosMin)}
                    </div>
                </div>
            </Zoom>
            <Zoom in={dragMax} mountOnEnter unmountOnExit>
                <div style={{ zIndex: 999, position: "absolute", top: 6, left: currentPosMax + barW / 2, opacity: 0.9 }}>
                    <div style={{ position: "absolute", left: "calc(50% - 5px)", top: -15, backgroundColor: contextMenuGray, height: 10, aspectRatio: 1, transform: "rotate(45deg)", borderRadius: 2, }}>
                    </div>
                    <div style={{ textAlign: "center", position: "absolute", top: -40, width: 20, zIndex: 40, backgroundColor: contextMenuGray, borderRadius: 4, paddingInline: 3, padding: 4, color: "white", transform: "translateX(-50%)" }}>
                        {numsToNorm(currentPosMax)}
                    </div>
                </div>
            </Zoom>
            <div style={{ position: "relative", width: barW + maxW, height: 8, backgroundColor: interactGray, borderRadius: 5, marginBlock: 2, }}>
                <div style={{ position: "absolute", width: currentPosMax - currentPosMin, height: 8, backgroundColor: focusBlue, borderRadius: 5, left: currentPosMin + barW / 2 }}>
                </div>

                <Draggable
                    axis="x"
                    bounds={{ left: 0, right: currentPosMax - barW * 1.1 }}
                    defaultPosition={{ x: 0, y: -3 }}
                    onDrag={handleStopMin}
                    position={{ x: currentPosMin, y: -3 }}
                    onStart={() => setDragMin(true)}
                    onStop={() => setDragMin(false)}
                //  grid={[8, 1]}
                >
                    <div style={{ position: "absolute", height: 14, width: barW, backgroundColor: "black", borderRadius: 3, cursor: "pointer", }}>

                    </div>
                </Draggable>


                <Draggable
                    axis="x"
                    bounds={{ left: currentPosMin + barW * 1.1, right: maxW, }}
                    defaultPosition={{ x: maxW, y: -3 }}
                    onDrag={handleStopMax}
                    position={{ x: currentPosMax, y: -3 }}
                    onStart={() => setDragMax(true)}
                    onStop={() => setDragMax(false)}
                //  grid={[8, 1]}
                >
                    <div style={{ position: "absolute", height: 14, width: barW, backgroundColor: "black", borderRadius: 3, cursor: "pointer", }}>
                    </div>
                </Draggable>
            </div>
        </div>
    )
}