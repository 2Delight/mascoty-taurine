import { Stack, Slider } from "@mui/material";
import { menuGray } from "../../utils/Colors";

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
      <Stack spacing={2} direction="row" sx={{
        // backgroundColor: "#808080",
        borderRadius: 2, fles: 2
      }} alignItems="center">
        {/* <VolumeDown className="dumbIcon" /> */}
        <Slider aria-label="Volume"
          sx={{
            marginRight: 2,
            marginLeft: 2,
            // padding: 2,
  
          }}
        // value={value} 
        // onChange={handleChange} 
        />
        {/* <VolumeUp className="dumbIcon" /> */}
      </Stack>
    </div>
  }