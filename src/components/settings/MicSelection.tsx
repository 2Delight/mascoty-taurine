import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import React from 'react';
import { menuGray } from '../../utils/Colors';

export default function MicSelection() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return <div style={{ display: "flex", flexDirection: "row", borderRadius: 10, backgroundColor: menuGray, justifyContent: "center", alignItems: "center", flex: 1, margin: 4 }}>
        <KeyboardVoiceTwoToneIcon className="dumbIcon" />
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
};