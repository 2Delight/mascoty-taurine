import { useContext, useEffect, useRef, useState } from "react";
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
import { appWindow } from "@tauri-apps/api/window";

const getMascotInterval = 10000
const getVolumeInterval = 50
const updateVoiceInterval = 10

export default function ShadowCanvas() {
    const [mc, setMc] = useState<IMascot>();
    const [mcHeight, setMcHeight] = useState(0);
    const [mcWidth, setMcWidth] = useState(0);

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
                    mascot = a
                    let width = 0, height = 0
                    for (let i = 0; i < mascot.emotions.length; i++) {
                        emoIndexes[mascot.emotions[i].emotion] = i
                        console.log(mascot.emotions[i].emotion)
                        for (let j = 0; j < mascot.emotions[i].parts.length; j++) {
                            if (mascot.emotions[i].parts[j].width + mascot.emotions[i].parts[j].positionX > width) {
                                width = mascot.emotions[i].parts[j].width + mascot.emotions[i].parts[j].positionX
                            }
                            if (mascot.emotions[i].parts[j].height + mascot.emotions[i].parts[j].positionY > height) {
                                height = mascot.emotions[i].parts[j].height + mascot.emotions[i].parts[j].positionY
                            }
                        }
                    }
                    setMc(a)
                    appWindow.setTitle(mascot.projectName + " ready for recording")
                    setMcHeight(height * a.zoom / 100)
                    setMcWidth(width * a.zoom / 100)
                    // alert(height * a.zoom / 100 + " " + width * a.zoom / 100)
                    // mascot = a
                    clearInterval(inteval)
                    getData()
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
        if (mascot)
            get_volume().then((data) => {
                let volum = Number(data)
                if (volum > mascot.maxMic) {
                    volum = mascot.maxMic
                }
                if (volum < mascot.minMic) {
                    volum = mascot.minMic
                }
                setVol(volum * mascot.shake / 100)
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
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    return <div className="shadowPlace" style={{
        position: "absolute",
        overflow: "hidden",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        margin: 0,
    }}>
        <div style={{
            overflow: "hidden",
            height: "100%",
            backgroundColor: mc?.bgColor,
            position: "relative",
        }}>
            <div style={{
                position: "absolute",
                width: "100%",
                left: windowSize[0] / 2 - mcWidth / 2,
                bottom: volume + mcHeight,
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
}