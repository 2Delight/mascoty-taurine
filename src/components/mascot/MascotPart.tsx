import { useContext, useEffect, useRef, useState } from "react";
import { MascotContext } from "../../App";
import { contextMenuGray, interactGray, menuGray } from "../../utils/Colors";
import diagArrows from "../../assets/resize.svg"
import Draggable from "react-draggable";
import { tauri } from "@tauri-apps/api";
import { getImageSize } from "react-image-size";
import { Collapse, Fade, Grow, Slide, Zoom } from "@mui/material";

export default function MascotPart({ partIndex, useFocus }: { partIndex: number, useFocus: boolean }) {
    const mascot = useContext(MascotContext);
    const [currentPos, setCurrentPos] = useState({ x: -1, y: -1 })
    const [height, setHeight] = useState(100)
    const [width, setWidth] = useState(100)
    const [loading, setLoading] = useState(true)
    const [zoom, setZoom] = useState(1)
    const [resizing, setResizing] = useState(false)
    const [infoPos, setinfoPos] = useState({ x: -1, y: -1 })
    const [defaultHW, setDefaultHW] = useState({ h: 100, w: 100 })

    useEffect(() => {
        if (mascot) {
            setZoom(mascot.mascot.zoom)
            setCurrentPos({
                x: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX * mascot.mascot.zoom,
                y: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY * mascot.mascot.zoom
            })
            setHeight(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].height * mascot.mascot.zoom)
            setWidth(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].width * mascot.mascot.zoom)
            // setLoading(false)
            getImageSize(tauri.convertFileSrc(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath)).then((dimens) => {
                if (dimens) {
                    setDefaultHW({ h: dimens.height * mascot.mascot.zoom, w: dimens.width * mascot.mascot.zoom })
                }
            })
            setLoading(false)
        }

    }, [
        mascot?.mascot.selectedPart, mascot?.mascot.zoom
    ])


    // useEffect(() => {
    //     if (mascot) {
    //         setZoom(mascot.mascot.zoom)
    //     }
    // }, [

    // ])

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
        // let absWorld = {x = }
        // console.log("start position: " + rb.x + " " + rb.y)

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            console.log("mouse position: " + mouseMoveEvent.pageX + " " + mouseMoveEvent.pageY)

            switch (dir) {
                case "rb": {
                    setinfoPos({ x: mouseMoveEvent.pageX - mouseDownEvent.pageX + relRb.x + startHW.w, y: mouseMoveEvent.pageY - mouseDownEvent.pageY + relRb.y + startHW.h })
                    console.log()
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
                    setinfoPos({ x: mouseMoveEvent.pageX - mouseDownEvent.pageX + relRb.x, y: mouseMoveEvent.pageY - mouseDownEvent.pageY + relRb.y })
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
                    setinfoPos({ x: mouseMoveEvent.pageX - mouseDownEvent.pageX + relRb.x, y: mouseMoveEvent.pageY - mouseDownEvent.pageY + relRb.y + startHW.h })

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
                    setinfoPos({ x: mouseMoveEvent.pageX - mouseDownEvent.pageX + relRb.x + startHW.w, y: mouseMoveEvent.pageY - mouseDownEvent.pageY + relRb.y })

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
            setResizing(true)
        }
        function onMouseUp() {
            setResizing(false)
            console.log("scaling mouseUp")
            document.body.removeEventListener("mousemove", onMouseMove);
            if (mascot) {
                mascot.mascot = structuredClone(mascot.mascot)
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = shadowXY.x / zoom
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = shadowXY.y / zoom
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].height = shadowHW.h / zoom
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].width = shadowHW.w / zoom
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
            mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = dragElement.x / zoom
            mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = dragElement.y / zoom
            mascot.setMascot(mascot.mascot)
        }
    };

    const dragref = useRef(null)
    return (!loading ?
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
                            outline: useFocus ? "2px dashed white" : "0",
                            height: height,
                            padding: 0,
                            margin: 0,
                        }} draggable={false}
                        >
                            <img crossOrigin='anonymous' src={
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
                            {useFocus && <div>
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
                                /></div>}
                        </div>}
                    </div>
                </Draggable>
                <Zoom in={resizing} mountOnEnter unmountOnExit>
                    <div style={{ zIndex: 999, position: "absolute", top: infoPos.y + 4, left: infoPos.x, opacity: 0.7 }}>
                        <div style={{ position: "absolute", left: "calc(50% - 15px)", top: 10, backgroundColor: contextMenuGray, height: 30, aspectRatio: 1, transform: "rotate(45deg)", borderRadius: 5, }}>
                        </div>
                        <div style={{ textAlign: "left", position: "absolute", top: 10, width: 50, zIndex: 40, backgroundColor: contextMenuGray, borderRadius: 10, padding: 10, color: "white", transform: "translateX(-50%)" }}>
                            <div>
                                {"H: " + Math.floor(height / defaultHW.h * 100) + "%"}
                            </div>
                            <div>
                                {"W: " + Math.floor(width / defaultHW.w * 100) + "%"}
                            </div>
                            <div>
                                {"R: " + Math.floor(height / defaultHW.h / width * defaultHW.w * 100) / 100}
                            </div>
                        </div>
                    </div>
                </Zoom>
                {/* {resizing && } */}
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