import { EEmotion } from "../components/logic/EEmotion";
import { EPart } from "../components/logic/EPart";
import IMascot from "../components/logic/IMascot";

export const DummyMascot: IMascot = {
    workingDir:"",
    projectName:"If you can see this something broke",
    emotions: [],
    bgColor: "gray",
    selectedEmotion: 0,
    selectedPart: 0,
    zoom: 1,
    minMic:0,
    maxMic:100,
    shake:75,
  };