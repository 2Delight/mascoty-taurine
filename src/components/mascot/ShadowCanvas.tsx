import IMascot from "../logic/IMascot";
import MascotPart from "./MascotPart";

export default function ShadowCanvas(height: number, width: number, mascot: IMascot, emotionIndex: number, eyes: boolean, mouth: boolean,) {

    return <div className="shadowPlace" style={{
        overflow: "auto",
        height: height,
        width: width,
        background: mascot.bgColor,
    }}

    >
        <div className="canvas"
            style={{ position: "relative", }}
        >
            {mascot.emotions[emotionIndex]?.parts?.map((c, i) => {
                return c.visibility && <MascotPart partIndex={i} key={i + c.sourcePath + c.name} useFocus={false} />
            })}
        </div>
    </div>
}