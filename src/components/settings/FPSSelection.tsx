import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { menuGray } from "../../utils/Colors";

export default function FPSSElection() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    
    return <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: menuGray,
        borderRadius: 10,
        margin: 4,
      }}>
        <a style={{
          margin: 0,
          paddingTop: 4,
          paddingLeft: 10,
          textAlign: "left",
        }}>
          Frames Per Second
        </a>
        <div style={{ flex: 4 }}>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </div>
      </div>
}