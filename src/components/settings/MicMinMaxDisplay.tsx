import { Stack } from "@mui/material";
import React from "react";
import { menuGray } from "../../utils/Colors";
import TwoSlider from "./TwoSlider";

export default function MicMinMaxDisplay() {
    const [value, setValue] = React.useState<number[]>([0, 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

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
            Mic Output
        </a>

        {/* <VolumeDown className="dumbIcon" /> */}
        <TwoSlider
        />

        {/* <VolumeUp className="dumbIcon" /> */}
    </div>
}