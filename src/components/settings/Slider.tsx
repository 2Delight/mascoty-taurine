import { Zoom } from "@mui/material";
import { height } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { MascotContext } from "../../App";
import { contextMenuGray, focusBlue, focusOrange, interactGray, menuGray } from "../../utils/Colors";

const maxW = 160
const barW = 20

export default function Slider() {
    const mascot = useContext(MascotContext);
    const [currentPos, setCurrentPos] = useState(0)
    const [drag, setDrag] = useState(false)


    const normToNums = (val: number) => {
        // console.log("norm to nums " + Math.floor(val / 100 * (maxW)))
        return Math.floor(val / 100 * (maxW))
    }
    const numsToNorm = (val: number) => {
        // console.log("nums to norm " + Math.floor(val / (maxW) * 100))
        return Math.floor(val / (maxW) * 100)
    }


    useEffect(() => {
        if (mascot) {
            setCurrentPos(normToNums(mascot.mascot.shake))
        }
    }, [])

    const handleStop = (event: any, dragElement: { x: any; y: any; }) => {
        // console.log("moved")
        setCurrentPos(dragElement.x)
        if (mascot) {
            mascot.mascot = structuredClone(mascot.mascot)
            mascot.mascot.shake = numsToNorm(dragElement.x)
            mascot.setMascot(mascot.mascot)
        }
    };

    return (

        <div style={{ position: "relative", width: barW + maxW, marginBlock: 10, justifySelf: "center", alignSelf: "center", }}>
            <Zoom in={drag} mountOnEnter unmountOnExit>
                <div style={{ zIndex: 999, position: "absolute", top: 6, left: currentPos + barW / 2, opacity: 0.9 }}>
                    <div style={{ position: "absolute", left: "calc(50% - 5px)", top: -15, backgroundColor: contextMenuGray, height: 10, aspectRatio: 1, transform: "rotate(45deg)", borderRadius: 2, }}>
                    </div>
                    <div style={{ textAlign: "center", position: "absolute", top: -40, width: 20, zIndex: 40, backgroundColor: contextMenuGray, borderRadius: 4, paddingInline: 3, padding: 4, color: "white", transform: "translateX(-50%)" }}>
                        {numsToNorm(currentPos)}
                    </div>
                </div>
            </Zoom>

            <div style={{ position: "relative", width: barW + maxW, height: 8, backgroundColor: interactGray, borderRadius: 5, marginBlock: 2, }}>
                <div style={{ position: "absolute", width: currentPos + barW / 2, height: 8, backgroundColor: focusBlue, borderRadius: 5, }}>
                </div>

                <Draggable
                    axis="x"
                    bounds={{ left: 0, right: maxW, }}
                    defaultPosition={{ x: 0, y: -3 }}
                    onDrag={handleStop}
                    onStart={() => setDrag(true)}
                    onStop={() => setDrag(false)}
                    position={{ x: currentPos, y: -3 }}
                //  grid={[8, 1]}
                >
                    <div style={{ height: 14, width: barW, backgroundColor: "black", borderRadius: 3, cursor: "pointer", }}>

                    </div>
                </Draggable>
            </div>
        </div>
    )
}