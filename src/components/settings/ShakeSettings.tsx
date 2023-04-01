import { Stack } from "@mui/material";
import { menuGray } from "../../utils/Colors";
import Slider from "./Slider";

export default function ShakeSettings() {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: menuGray,
    borderRadius: 10,
    margin: 4,
    alignContent: "center",
    justifyContent: "center"
  }}>
    <a style={{
      margin: 0,
      paddingTop: 4,
      paddingLeft: 10,
    }}>
      Mascot Shaking Strength
    </a>

    <Slider />
  </div>
}