import { useContext, useEffect, useState } from "react";
import { MascotContext } from "../../App";
import { menuGray } from "../../utils/Colors";
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

    useEffect(() => {
        if (mascot) {
            setSize(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].scale)
            setCurrentPos({
                x: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
                y: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY
            })
        }
    }, [
        mascot?.mascot.selectedEmotion
    ])

    const sizeHandler = (mouseDownEvent: { pageX: any; pageY: any; }) => {
        console.log("asdasdasd")
        const startSize = size;
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            console.log("scaling")
            setSize(currentSize => (
                startSize * mouseMoveEvent.pageX / startPosition.x
                // startSize.y - startPosition.y + mouseMoveEvent.pageY
            ));
        }
        function onMouseUp() {
            console.log("mouseUp")
            document.body.removeEventListener("mousemove", onMouseMove);
            // uncomment the following line if not using `{ once: true }`
            // document.body.removeEventListener("mouseup", onMouseUp);
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

    return (
        partIndex == mascot?.mascot.selectedPart ?
            <Draggable
                onStop={handleStop}
                position={{ x: currentPos.x, y: currentPos.y }}
                positionOffset={mouseStart}
            >
                {/* <Resizable> */}
                <div style={{
                    userSelect: "none",
                    position: "absolute",
                    // left: currentPos.x,
                    // top: currentPos.y,
                    outline: "3px dashed white",
                    zIndex: 100,
                    // transform: "scale(" + size + ")",
                }}
                >
                    <img src={"https://asset.localhost/" + mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath}
                        style={{
                            objectFit: 'contain',
                            // outline: "3px dashed white",
                        }}
                        draggable={false}
                    ></img>
                    {/* <img src={diagArrows} style={{ right: -15, bottom: -15, height: 30, aspectRatio: 1, position: "absolute", background: "black" }} onMouseDown={sizeHandler} /> */}
                </div>
                {/* </Resizable> */}
            </Draggable>
            :
            <Draggable
                disabled={true}
                position={{ x: currentPos.x, y: currentPos.y }}
                positionOffset={mouseStart}
            // positionOffset={mascot ? { x: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX, y: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY } : { x: 0, y: 0 }}
            >

                <div style={{
                    userSelect: "none",
                    position: "absolute",
                    // left: currentPos.x,
                    // top: currentPos.y,
                    opacity: 0.7,
                    transform: "scale(" + size + ")",
                }}>
                    <img src={"https://asset.localhost/" + mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath} style={{ objectFit: 'contain' }} draggable={false}></img>
                </div>
            </Draggable>
    )
}