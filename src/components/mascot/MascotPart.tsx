import { useContext, useEffect, useState } from "react";
import { MascotContext } from "../../App";
import { menuGray } from "../../utils/Colors";
import diagArrows from "../../assets/resize.svg"

export default function MascotPart({ partIndex }: { partIndex: number }) {
    const mascot = useContext(MascotContext);

    // const [mouseStart, setMouseStart] = useState({ x: mascot ? mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX : 0, y: mascot ? mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX : 0 });
    const [dragging, setDragging] = useState(false);
    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 })
    const [mouseEnd, setMouseEnd] = useState({ x: 0, y: 0 })
    const [size, setSize] = useState(1);
    const [currentPos, setCurrentPos] = useState({x: 0, y: 0})

    useEffect(() => {
        if (mascot) {
            setSize(mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].scale)
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


    const moveHandler = (mouseDownEvent: { pageX: any; pageY: any; }) => {
        if (dragging) {
            return
            setDragging(false)
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            return
        }
        console.log("start dragging")
        setDragging(true)
        const startPosition = { x: mouseStart.x, y: mouseStart.y };
        const startPositionBase = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp, { once: true });
        // document.addEventListener("mousedown", onMouseDown, { once: true });

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            console.log("moved")
            let end = mouseEnd
            end.x = startPosition.x + mouseMoveEvent.pageX - startPositionBase.x
            end.y = startPosition.y + mouseMoveEvent.pageY - startPositionBase.y
            setMouseEnd(end)
            setCurrentPos(end)
            // setMouseStart(end)
            // if (mascot) {
            //     mascot.mascot = structuredClone(mascot.mascot)
            //     mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = mouseEnd.x
            //     mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = mouseEnd.y
            //     mascot.setMascot(mascot.mascot)
            // }
        }
        function onMouseUp() {
            console.log("mouse Up")
            
            // document.body.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            setMouseStart(mouseEnd)
            setDragging(false)
        }
        function onMouseDown() {
            console.log("mouse Down")
            // document.body.removeEventListener("mousemove", onMouseMove);
            // setMouseStart(mouseEnd)
        } 
    };


    return partIndex == mascot?.mascot.selectedPart ? <div style={{
        position: "absolute",
        left: currentPos.x,
        top: currentPos.y,
        outline: "3px dashed white",
        zIndex: 100,
        transform: "scale(" + size +")",
    }} onMouseDownCapture={moveHandler}>
        <img src={mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath} style={{objectFit: 'contain'}}  ></img>
        <img src={diagArrows} style={{ right: -15, bottom: -15, height: 30, aspectRatio: 1, position: "absolute" }} onMouseDown={sizeHandler}/>
    </div> : <div style={{
        position: "absolute",
        left: mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
        top: mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY,
        opacity: 0.7,
        transform: "scale(" + size +")",
    }}>
        <img src={mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath} style={{objectFit: 'contain'}}></img>
    </div>
}