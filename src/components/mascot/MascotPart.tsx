import { useContext, useEffect, useRef, useState } from "react";
import { MascotContext } from "../../App";
import { interactGray, menuGray } from "../../utils/Colors";
import diagArrows from "../../assets/resize.svg"
import Draggable from "react-draggable";
import { tauri } from "@tauri-apps/api";

export default function MascotPart({ partIndex }: { partIndex: number }) {
    const mascot = useContext(MascotContext);
    const [currentPos, setCurrentPos] = useState({ x: -1, y: -1 })
    const [height, setHeight] = useState(100)
    const [width, setWidth] = useState(100)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (mascot) {
            setCurrentPos({
                x: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
                y: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY
            })
            setHeight(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].height)
            setWidth(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].width)
            // setLoading(false)
        }
    }, [
        mascot?.mascot.selectedPart
    ])

    useEffect(() => {
        if (currentPos.x !== -1 && currentPos.y !== -1) {
            setLoading(false)
            console.log("updated pos")
        }
    }, [currentPos])

    const sizeHandler = (mouseDownEvent: any, dir: string) => {
        mouseDownEvent.stopPropagation()
        console.log("scaling mouseDown")
        let rb = { x: mouseDownEvent.pageX - width, y: mouseDownEvent.pageY - height };
        let relRb = { x: currentPos.x, y: currentPos.y };
        let startHW = { h: height, w: width }
        let lt = { x: mouseDownEvent.pageX + width, y: mouseDownEvent.pageY + height };
        let shadowHW = { h: height, w: width }
        let shadowXY = { x: currentPos.x, y: currentPos.y };
        // console.log("start position: " + rb.x + " " + rb.y)

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            console.log("mouse position: " + mouseMoveEvent.pageX + " " + mouseMoveEvent.pageY)
            switch (dir) {
                case "rb": {
                    if (mouseMoveEvent.pageX - rb.x > 10) {
                        setWidth(mouseMoveEvent.pageX - rb.x)
                        shadowHW.w = mouseMoveEvent.pageX - rb.x
                    }
                    if (mouseMoveEvent.pageY - rb.y > 10) {
                        setHeight(mouseMoveEvent.pageY - rb.y)
                        shadowHW.h = mouseMoveEvent.pageY - rb.y
                    }
                    break
                }
                case "lt": {
                    let newx = mouseMoveEvent.pageX + relRb.x - lt.x + startHW.w
                    let newy = mouseMoveEvent.pageY + relRb.y - lt.y + startHW.h
                    if (mouseMoveEvent.pageX + 15 > lt.x) {
                        newx = currentPos.x + startHW.w - 10
                    }
                    if (mouseMoveEvent.pageY + 15 > lt.y) {
                        newy = currentPos.y + startHW.h - 10
                    }
                    setCurrentPos({ x: newx, y: newy })
                    shadowXY = { x: newx, y: newy }
                    if (lt.x - mouseMoveEvent.pageX > 10) {
                        setWidth(lt.x - mouseMoveEvent.pageX)
                        shadowHW.w = lt.x - mouseMoveEvent.pageX
                    }
                    if (lt.y - mouseMoveEvent.pageY > 10) {
                        setHeight(lt.y - mouseMoveEvent.pageY)
                        shadowHW.h = lt.y - mouseMoveEvent.pageY
                    }
                    break
                }
                case "lb": {
                    if (mouseMoveEvent.pageX + 15 < lt.x) {
                        setCurrentPos({ x: mouseMoveEvent.pageX + relRb.x - lt.x + startHW.w, y: currentPos.y })
                        shadowXY = { x: mouseMoveEvent.pageX + relRb.x - lt.x + startHW.w, y: currentPos.y }
                    }
                    if (lt.x - mouseMoveEvent.pageX > 10) {
                        setWidth(lt.x - mouseMoveEvent.pageX)
                        shadowHW.w = lt.x - mouseMoveEvent.pageX
                    }
                    if (mouseMoveEvent.pageY - rb.y > 10) {
                        setHeight(mouseMoveEvent.pageY - rb.y)
                        shadowHW.h = mouseMoveEvent.pageY - rb.y
                    }
                    break
                }
                case "rt": {
                    if (mouseMoveEvent.pageY + 15 < lt.y) {
                        setCurrentPos({ x: currentPos.x, y: mouseMoveEvent.pageY + relRb.y - lt.y + startHW.h })
                        shadowXY = { x: currentPos.x, y: mouseMoveEvent.pageY + relRb.y - lt.y + startHW.h }
                    }

                    if (mouseMoveEvent.pageX - rb.x > 10) {
                        setWidth(mouseMoveEvent.pageX - rb.x)
                        shadowHW.w = mouseMoveEvent.pageX - rb.x
                    }
                    if (lt.y - mouseMoveEvent.pageY > 10) {
                        setHeight(lt.y - mouseMoveEvent.pageY)
                        shadowHW.h = lt.y - mouseMoveEvent.pageY
                    }
                    break
                }
            }

        }
        function onMouseUp() {
            console.log("scaling mouseUp")
            document.body.removeEventListener("mousemove", onMouseMove);
            if (mascot) {
                mascot.mascot = structuredClone(mascot.mascot)
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = shadowXY.x
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = shadowXY.y
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].height = shadowHW.h
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].width = shadowHW.w
                console.log(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex])
                mascot.setMascot(mascot.mascot)
            }
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    const handleStop = (event: any, dragElement: { x: any; y: any; }) => {
        console.log("moved")
        setCurrentPos({ x: dragElement.x, y: dragElement.y })
        if (mascot) {
            mascot.mascot = structuredClone(mascot.mascot)
            mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = dragElement.x
            mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = dragElement.y
            mascot.setMascot(mascot.mascot)
        }
    };

    const dragref = useRef(null)
    return (
        partIndex == mascot?.mascot.selectedPart ?
            <div style={{
                zIndex: 100,
            }}>
                <Draggable
                    ref={dragref}
                    onStop={handleStop}
                    position={{ x: currentPos.x, y: currentPos.y }}
                >
                    <div className="grab"
                        style={{
                            zIndex: 100,
                            userSelect: "none",
                            padding: 0,
                            margin: 0,
                        }} draggable={false}
                    >
                        {!loading && <div style={{
                            // zIndex: 100,
                            userSelect: "none",
                            transformOrigin: "left top",
                            position: "absolute",
                            outline: "2px dashed white",
                            height: height,
                            padding: 0,
                            margin: 0,
                        }} draggable={false}
                        >
                            <img src={
                                // "https://asset.localhost/" + 
                                mascot ? tauri.convertFileSrc(mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath) : ""}
                                style={{
                                    // zIndex: 100,
                                    userSelect: "none",
                                    objectFit: 'fill',
                                    height: height,
                                    width: width,
                                    padding: 0,
                                    margin: 0,
                                    // margin: 0,
                                    // paddingBottom: -10,
                                }}
                                draggable={false}
                            ></img>
                            <div className="resizelt" draggable={false}
                                style={{ cursor: "resize", right: -5, bottom: -5, height: 10, aspectRatio: 1, position: "absolute", background: interactGray, transform: "unset", outline: "2px solid white", borderRadius: 20, }}
                                onMouseDown={(e) => { sizeHandler(e, "rb") }}
                            />
                            <div className="resizelt" draggable={false}
                                style={{ left: -5, top: -5, height: 10, aspectRatio: 1, position: "absolute", background: interactGray, transform: "unset", outline: "2px solid white", borderRadius: 20 }}
                                onMouseDown={(e) => { sizeHandler(e, "lt") }}
                            />
                            <div className="resizerb" draggable={false}
                                style={{ left: -5, bottom: -5, height: 10, aspectRatio: 1, position: "absolute", background: interactGray, transform: "unset", outline: "2px solid white", borderRadius: 20 }}
                                onMouseDown={(e) => { sizeHandler(e, "lb") }}
                            />
                            <div className="resizerb" draggable={false}
                                style={{ right: -5, top: -5, height: 10, aspectRatio: 1, position: "absolute", background: interactGray, transform: "unset", outline: "2px solid white", borderRadius: 20 }}
                                onMouseDown={(e) => { sizeHandler(e, "rt") }}
                            />
                        </div>}
                    </div>
                </Draggable>
            </div>
            :
            <div style={{
                zIndex: 1,
                userSelect: "none",
                pointerEvents: "none"
            }} draggable={false}
            >
                <div style={{
                    // zIndex: 100,
                    top: currentPos.y,
                    left: currentPos.x,
                    position: "absolute",
                    userSelect: "none",
                    // opacity: 0.5,
                }} draggable={false}
                >
                    <img src={mascot ? tauri.convertFileSrc(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath) : ""}
                        style={{
                            objectFit: 'fill',
                            height: height,
                            width: width,
                        }}
                        draggable={false}
                    />
                </div>
            </div>


    )
}