import { useContext, useState } from "react";
import { MascotContext } from "../../App";
import { menuGray } from "../../utils/Colors";

export default function MascotPart({ partIndex }: { partIndex: number }) {
    const mascot = useContext(MascotContext);

    const [mouseStart, setMouseStart] = useState({ x: mascot ? mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX : 0, y: mascot ? mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX : 0 });
    const [dragging, setDragging] = useState(false);
    const [mouseEnd, setMouseEnd] = useState({ x: 0, y: 0 })


    const handler = (mouseDownEvent: { pageX: any; pageY: any; }) => {
        const startPosition = { x: mouseStart.x, y: mouseStart.y };
        const startPositionBase = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            let end = mouseEnd
            end.x = startPosition.x + mouseMoveEvent.pageX - startPositionBase.x
            end.y = startPosition.y + mouseMoveEvent.pageY - startPositionBase.y
            setMouseEnd(end)
            if (mascot) {
                mascot.mascot = structuredClone(mascot.mascot)
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX = mouseEnd.x
                mascot.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY = mouseEnd.y
                mascot.setMascot(mascot.mascot)
            }
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            setMouseStart(mouseEnd)
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    return partIndex == mascot?.mascot.selectedPart ? <div style={{
        position: "absolute",
        left: mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
        top: mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY,
        outline: "3px dashed white",
        zIndex: 100,
    }} onMouseDown={handler}>
        <img src={mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath}></img>
    </div> : <div style={{
        position: "absolute",
        left: mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionX,
        top: mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].positionY,
        opacity: 0.7,
    }}>
        <img src={mascot?.mascot.emotions[mascot.mascot.selectedEmotion].parts[partIndex].sourcePath}></img>
    </div>
}

function Resizeable({ }) {
    const [size, setSize] = useState({ x: 400, y: 300 });

    const handler = (mouseDownEvent: { pageX: any; pageY: any; }) => {
        const startSize = size;
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            setSize(currentSize => ({
                x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
                y: startSize.y - startPosition.y + mouseMoveEvent.pageY
            }));
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            // uncomment the following line if not using `{ once: true }`
            // document.body.removeEventListener("mouseup", onMouseUp);
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    return (
        <div id="container" style={{ width: size.x, height: size.y }}>
            <button id="draghandle" type="button" onMouseDown={handler} >Resize</button>
        </div>
    );
}