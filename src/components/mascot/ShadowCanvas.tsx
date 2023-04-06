import { useContext, useEffect, useState } from "react";
import { MascotContext } from "../../App";
import IMascot from "../logic/IMascot";
import MascotPart from "./MascotPart";
import { DummyMascot } from "../../utils/DummyMascot";
import { IMascotData } from "../logic/IMascotData";
import { EEmotion } from "../logic/EEmotion";
import { EPart } from "../logic/EPart";
import { toast } from "react-toastify";
import ShadowPart from "./ShadowPart";
import { get_mascot } from "../../utils/Commands";
import { descriptRawEmotion } from "../../utils/EDescriptor";

const getMascotInterval = 1000
const updateVoiceInterval = 20

export default function ShadowCanvas({ mascot }: { mascot: IMascot }) {
    const [mc, setMc] = useState<IMascot>(mascot);

    var oldVol = 0
    var vol = 0

    const [volume, setVol] = useState(0)

    useEffect(() => {
        let nemoIndexes: number[] = []
        if (mascot) {
            console.log("MASCOT SET")
            console.log(mascot)

            for (let i = 0; i < mascot.emotions.length; i++) {
                nemoIndexes[mascot.emotions[i].emotion] = i
                console.log(mascot.emotions[i].emotion)
            }
        } else {
            console.log("CANT FIND MASCOT")
        }

        let inter = setInterval(() => getData(nemoIndexes), getMascotInterval)
        let interVoice = setInterval(() => updateVol(), updateVoiceInterval)

        return () => {
            console.log("STOPING")
            clearInterval(inter)
            clearInterval(interVoice)
        }
        // }
    }, [])

    const updateVol = () => {
        // if (oldVol > vol) {
        //     oldVol--
        // }
        // if (oldVol < vol) {
        //     oldVol++
        // }
        if (Math.abs(vol - oldVol) < 2)
            return
        oldVol += (vol - oldVol) * (updateVoiceInterval / getMascotInterval)
        console.log(oldVol)
        setVol(oldVol)
        // setVol(Number(oldVol))
    }

    const getData = (ei: number[]) => {
        get_mascot().then((data) => applyDataToMascot(data as IMascotData, ei))
    }

    const applyDataToMascot = (dt: IMascotData, emoIndexes: number[]) => {
        // dt.emotion = 'angry'
        let emo: EEmotion = descriptRawEmotion(dt.emotion)
        // console.log("EMO: " + emo)
        // console.log("EMOINDEX " + emoIndexes[emo])
        console.log(dt)
        console.log(mc)
        if (emoIndexes[emo] === undefined) {
            console.log("Bad Emotion")
            console.log(dt)
            return
        }

        let mcc = structuredClone(mc)

        for (let i = 0; i < mcc.emotions.length; i++) {
            if (i !== emoIndexes[emo]) {
                mcc.emotions[i].visibility = false
            } else {
                mcc.emotions[i].visibility = true
                console.log("emotion No" + i + " visible")
            }
        }

        vol = dt.voice

        for (let i = 0; i < mcc.emotions[emoIndexes[emo]].parts.length; i++) {
            switch (mcc.emotions[emoIndexes[emo]].parts[i].type) {
                case EPart.eyesClosed: {
                    if (dt.blink) {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = true
                    } else {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = false
                    }
                    break
                }
                case EPart.eyesOpened: {
                    if (dt.blink) {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = false
                    } else {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = true
                    }
                    break
                }
                case EPart.mouthOpened: {
                    if (dt.lips) {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = true
                    } else {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = false
                    }
                    break
                }
                case EPart.mouthClosed: {
                    if (dt.lips) {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = false
                    } else {
                        mcc.emotions[emoIndexes[emo]].parts[i].visibility = true
                    }
                    break
                }
                default: {
                    mcc.emotions[emoIndexes[emo]].parts[i].visibility = true
                }
            }
        }
        setMc(mcc)
    }

    return <div className="shadowPlace" style={{
        flex: 10,
        paddingTop: 10,
        paddingLeft: 10,
        position: "relative",

    }}>
        <div style={{
            overflow: "hidden",
            height: "100%",
            backgroundColor: mascot.bgColor,
        }}>
            <div className="canvas"
                style={{ position: "relative", }}
            >
                <div style={{
                    position: "absolute",
                    bottom: volume,
                }}>
                    {mc && mc.emotions.map((x, j) => {
                        return x.parts.map((c, i) => {
                            return <ShadowPart part={c} emoVisible={x.visibility} zoom={mc.zoom} key={j + "_" + i} />
                        })
                    }
                    )}
                </div>
            </div>
        </div>
    </div>
}