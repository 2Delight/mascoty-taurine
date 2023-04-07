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
import { get_mascot, get_raw_mascot, get_volume } from "../../utils/Commands";
import { descriptRawEmotion } from "../../utils/EDescriptor";
import "../../App.css";

const getMascotInterval = 1000
const getVolumeInterval = 50
const updateVoiceInterval = 20

export default function ShadowCanvas() {
    const [mc, setMc] = useState<IMascot>();

    var mascot: IMascot;
    var oldVol = 0
    var vol = 0
    var emoIndexes: number[] = []

    const [volume, setVol] = useState(0)

    useEffect(() => {
        let inteval = setInterval(() => {
            get_raw_mascot().then((data) => {
                let a = JSON.parse(String(data))
                if ((a as IMascot).workingDir !== "") {
                    console.log("SET MASCOT")
                    console.log(a)
                    for (let i = 0; i < a.emotions.length; i++) {
                        emoIndexes[a.emotions[i].emotion] = i
                        console.log(a.emotions[i].emotion)
                    }
                    setMc(a)
                    mascot = a
                    clearInterval(inteval)
                } else {
                    console.log("bad data")
                }
            })
        }, 10)


        let inter = setInterval(() => getData(), getMascotInterval)
        let interVoice = setInterval(() => updateVol(), updateVoiceInterval)
        let interVolume = setInterval(() => getVol(), getVolumeInterval)


        return () => {
            console.log("STOPING")
            clearInterval(inter)
            clearInterval(interVoice)
            clearInterval(interVolume)
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
        // if (Math.abs(vol - oldVol) < 2)
        //     return
        oldVol += (vol - oldVol) * (updateVoiceInterval / getMascotInterval)
        // console.log(oldVol)
        setVol(Math.floor(oldVol))
        // setVol(Number(oldVol))
    }

    const getVol = () => {
        get_volume().then((data) => {
            // vol = Number(data)
            setVol(Number(data))
            // console.log(vol)
        })
    }

    const getData = () => {
        get_mascot().then((data) => applyDataToMascot(data as IMascotData))
    }

    const applyDataToMascot = (dt: IMascotData) => {
        // dt.emotion = 'angry'
        let emo: EEmotion = descriptRawEmotion(dt.emotion)
        // console.log("EMO: " + emo)
        // console.log("EMOINDEX " + emoIndexes[emo])
        // console.log(dt)
        // console.log(mc)
        if (emoIndexes[emo] === undefined || mc?.workingDir === "") {
            console.log("Bad Emotion")
            // console.log(dt)
            return
        }

        let mcc = mascot

        if (!mcc) {
            console.log("NO MASCOT")
            return
        } else {
            console.log(mcc)
        }

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
        setMc((old) => structuredClone(mcc))
        mascot = mcc
    }

    return <div className="shadowPlace" style={{
        position: "absolute",
        overflow:"hidden",
        height: "100%",
        width: "100%",
        backgroundColor:"black",
        margin:0,

    }}>
        <div style={{
            overflow: "hidden",
            height: "100%",
            backgroundColor: mc?.bgColor,
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