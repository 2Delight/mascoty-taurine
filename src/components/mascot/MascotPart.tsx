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
            setMouseStart({
                x: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
                y: mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY
            })
        }
    }, [
        // mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex]
    ])

    // useEffect(() => {
    //     if (mascot) {
    //         mascot.mascot = structuredClone(mascot.mascot)
    //         mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = mouseEnd.x
    //         mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = mouseEnd.y
    //         mascot.setMascot(mascot.mascot)
    //     }
    // }, [
    //    mouseStart
    // ]) 

    // const moveHandler = (mouseDownEvent: { pageX: any; pageY: any; }) => {
    //     console.log("start dragging")
    //     const startPosition = { x: mouseStart.x, y: mouseStart.y };
    //     const startPositionBase = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    //     function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
    //         console.log("moved")
    //         let end = mouseEnd
    //         end.x = startPosition.x + mouseMoveEvent.pageX - startPositionBase.x
    //         end.y = startPosition.y + mouseMoveEvent.pageY - startPositionBase.y
    //         setMouseEnd(end)
    //         setCurrentPos(end)
    //         // setMouseStart(end)
    //         // if (mascot) {
    //         //     mascot.mascot = structuredClone(mascot.mascot)
    //         //     mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = mouseEnd.x
    //         //     mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = mouseEnd.y
    //         //     mascot.setMascot(mascot.mascot)
    //         // }
    //     }
    //     function onMouseUp() {
    //         console.log("mouse up")
    //         document.body.removeEventListener("mousemove", onMouseMove);
    //         setMouseStart(mouseEnd)
    //     }

    //     document.body.addEventListener("mousemove", onMouseMove);
    //     document.body.addEventListener("mouseup", onMouseUp, { once: true });
    // };


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

    // return (
    //     <div id="container" style={{ width: size.x, height: size.y }}>
    //         <button id="draghandle" type="button" onMouseDown={handler} >Resize</button>
    //     </div>
    // );


    // const moveHandler = (mouseDownEvent: { pageX: any; pageY: any; }) => {
    //     if (dragging) {
    //         // return
    //         setDragging(false)
    //         document.removeEventListener("mousemove", onMouseMove);
    //         document.removeEventListener("mouseup", onMouseUp);
    //         return
    //     }
    //     console.log("start dragging")
    //     setDragging(true)
    //     const startPosition = { x: mouseStart.x, y: mouseStart.y };
    //     const startPositionBase = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    //     document.addEventListener("mousemove", onMouseMove);
    //     document.addEventListener("mouseup", onMouseUp, { once: true });
    //     // document.addEventListener("mousedown", onMouseDown, { once: true });

    //     function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
    //         console.log("moved")
    //         let end = mouseEnd
    //         end.x = startPosition.x + mouseMoveEvent.pageX - startPositionBase.x
    //         end.y = startPosition.y + mouseMoveEvent.pageY - startPositionBase.y
    //         setMouseEnd(end)
    //         setCurrentPos(end)
    //         // setMouseStart(end)
    //         // if (mascot) {
    //         //     mascot.mascot = structuredClone(mascot.mascot)
    //         //     mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = mouseEnd.x
    //         //     mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = mouseEnd.y
    //         //     mascot.setMascot(mascot.mascot)
    //         // }
    //     }
    //     function onMouseUp() {
    //         console.log("mouse Up")

    //         // document.body.removeEventListener("mousedown", onMouseDown);
    //         document.removeEventListener("mousemove", onMouseMove);
    //         document.removeEventListener("mouseup", onMouseUp);
    //         setMouseStart(mouseEnd)
    //         setDragging(false)
    //     }
    //     function onMouseDown() {
    //         console.log("mouse Down")
    //         // document.body.removeEventListener("mousemove", onMouseMove);
    //         // setMouseStart(mouseEnd)
    //     }
    // };
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
                // disabled={isDraggerDisabled}
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


                // draggable={true}
                // onMouseDown={moveHandler}
                // onDragStart={() => {return false}}
                // onDragStart={() => {
                //     console.log("Started Dragging")
                // }}
                // onDragEnd={() => {
                //     console.log("Ended Dragging")
                // }}
                // onDrag={() => {
                //     console.log("Dragging")
                // }}
                >
                    <img src={mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath}
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
                    <img src={mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath} style={{ objectFit: 'contain' }} draggable={false}></img>
                </div>
            </Draggable>
    )
}