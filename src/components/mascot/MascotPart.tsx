import { useContext, useEffect, useRef, useState } from "react";
import { MascotContext } from "../../App";
import { interactGray, menuGray } from "../../utils/Colors";
import diagArrows from "../../assets/resize.svg"
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

export default function MascotPart({ partIndex }: { partIndex: number }) {
    const mascot = useContext(MascotContext);
    const [isDraggerDisabled, setIsDraggerDisabled] = useState(false)

    // const [mouseStart, setMouseStart] = useState({ x: mascot ? mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX : 0, y: mascot ? mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX : 0 });
    const [dragging, setDragging] = useState(false);
    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 })
    const [mouseEnd, setMouseEnd] = useState({ x: 0, y: 0 })
    const [size, setSize] = useState(1);
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
    const [height, setHeight] = useState(100)
    const [width, setWidth] = useState(100)

    useEffect(() => {
        if (mascot) {
            // setSize(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].scale)
            setCurrentPos({
                x: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
                y: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY
            })
            setHeight(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].height)
            setWidth(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].width)
        }
    }, [
        mascot?.mascot.selectedEmotion
    ])

    const sizeHandler = (mouseDownEvent: any) => {
        mouseDownEvent.stopPropagation()
        console.log("scaling mouseDown")
        const startSize = size;
        const startPosition = { x: mouseDownEvent.pageX - width, y: mouseDownEvent.pageY - height };
        console.log("start position: " + startPosition.x + " " + startPosition.y)

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            console.log("mouse position: " + mouseMoveEvent.pageX + " " + mouseMoveEvent.pageY)
            console.log("current position: " + currentPos.x + " " + currentPos.y)
            // console.log("scaling mouseMove")
            setWidth(mouseMoveEvent.pageX - startPosition.x)
            setHeight(mouseMoveEvent.pageY - startPosition.y)
            // setHeight(mouseMoveEvent.pageY-mouseStart.y)
            // setSize(currentSize => (
            //     startSize * mouseMoveEvent.pageX / startPosition.x
            //     // startSize.y - startPosition.y + mouseMoveEvent.pageY
            // ));
        }
        function onMouseUp() {
            console.log("scaling mouseUp")
            document.body.removeEventListener("mousemove", onMouseMove);
            // uncomment the following line if not using `{ once: true }`
            // document.body.removeEventListener("mouseup", onMouseUp);
            if (mascot) {
                mascot.mascot = structuredClone(mascot.mascot)
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].height = height
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].width = width
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
    console.log(size)

    const dragref = useRef(null)
    return (
        partIndex == mascot?.mascot.selectedPart ?
            // <div style={{ padding: 10, border: "solid 1px red", }}>
            <Draggable
                ref={dragref}
                onStop={handleStop}
                position={{ x: currentPos.x, y: currentPos.y }}
                positionOffset={mouseStart}
            >
                {/* <Resizable> */}
                <div style={{
                    zIndex: 100,
                }} draggable={false}
                >
                    <div style={{
                        transformOrigin: "left top",
                        // transform: "scale(" + size + ")",
                        position: "absolute",
                        outline: "1px dashed white",
                        // height: height,
                        // width: width,
                    }} draggable={false}
                    >
                        <img src={"https://asset.localhost/" + mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath}
                            style={{
                                objectFit: 'fill',
                                height: height,
                                width: width,
                                // transform: "scale(" + size + ")",

                                // outline: "3px dashed white",
                            }}
                            draggable={false}
                        ></img>
                        <div draggable={false}
                            style={{ right: -5, bottom: -5, height: 10, aspectRatio: 1, position: "absolute", background: interactGray, transform: "unset", outline: "2px solid white", borderRadius: 20 }} onMouseDown={sizeHandler}
                        />
                        {/* <img draggable={false} src={diagArrows} style={{ right: -15, bottom: -15, height: 30, aspectRatio: 1, position: "absolute", background: "black", transform: "unset" }} onMouseDown={sizeHandler} /> */}
                    </div>
                </div>
                {/* </Resizable> */}
            </Draggable>
            // </div>
            :

            <img src={"https://asset.localhost/" + mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath}
                style={{
                    objectFit: 'fill',
                    height: height,
                    width: width,
                    top: currentPos.y,
                    left: currentPos.x,
                    position: "absolute",
                    opacity:0.5
                    // transform: "scale(" + size + ")",

                    // outline: "3px dashed white",
                }}
                draggable={false}
            ></img>

    )
}