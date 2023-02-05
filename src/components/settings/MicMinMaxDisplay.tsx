import { Stack, Slider } from "@mui/material";
import React from "react";

function valuetext(value: number) {
    return `${value}%`;
}

export default function MicMinMaxDisplay() {
    const [value, setValue] = React.useState<number[]>([0, 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#E6E6E6",
        borderRadius: 10,
        margin: 4,
        alignContent: "center",
        justifyContent: "center"
    }}>
        <a style={{
            margin: 0,
            paddingTop: 4,
            paddingLeft: 10,
            color: "black",
        }}>
            Mic Output
        </a>
        <Stack spacing={2} direction="row" sx={{
            // backgroundColor: "#808080",
            borderRadius: 2, fles: 2
        }} alignItems="center">
            {/* <VolumeDown className="dumbIcon" /> */}
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                sx={{
                    marginRight: 2,
                    marginLeft: 2,
                    // padding: 2,

                }}
            />

            {/* <VolumeUp className="dumbIcon" /> */}
        </Stack>
    </div>
}