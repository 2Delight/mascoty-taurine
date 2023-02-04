import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { flushSync } from 'react-dom';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async';
import { Box, Button, Card, CardActions, CardContent, createTheme, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, MenuItem, Modal, Select, SelectChangeEvent, Slider, Stack, ThemeProvider, Typography } from "@mui/material";
import { AspectRatio, VolumeDown, VolumeUp } from "@mui/icons-material";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import KeyboardVoiceTwoToneIcon from '@mui/icons-material/KeyboardVoiceTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import { minHeight, minWidth } from "@mui/system";
import React from "react";
import { BlockPicker, CirclePicker, SketchPicker } from 'react-color';
import { m } from "@tauri-apps/api/dialog-15855a2f";

// interface IMascot {
//   blink: boolean;
//   emotion: string;
//   lips: boolean;
//   voice: number;
// }
const theme = createTheme({
  palette: {
    primary: {
      main: "#494949"
    },
    secondary: {
      main: '#E33E7F'
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 4,
          paddingRight: 4,
          fontSize: 10,
          borderRadius: 5,
          marginRight: 3,
          marginLeft: 3,

          '&.Mui-selected': {
            backgroundColor: '#616161',
            '&:hover': {
              backgroundColor: '#494949',
            }
          },
          '&:hover': {
            backgroundColor: '#767676',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          // backgroundColor: "black",
          borderColor: "black",
          filter: "",
          padding: 5,
        },
        outlined: {
          borderColor: "black",
        }

      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            height: 15,
            width: 25,
            border: '2px solid #E6E6E6',
            borderRadius: 2,
            backgroundColor: 'black',
            // boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &.Mui-active': {
              boxShadow:
                '0 0 0 rgba(0,0,0,0.1),0 0 0 rgba(0,0,0,0.3),0 0 0 0 rgba(0,0,0,0.02)',
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                // boxShadow: iOSBoxShadow,
              },
            },
          },
          // '& .MuiSlider-valueLabel': {
          //   fontSize: 12,
          //   fontWeight: 'normal',
          //   top: -6,
          //   backgroundColor: 'unset',
          //   // color: theme.palette.text.primary,
          //   '&:before': {
          //     display: 'none',
          //   },
          //   '& *': {
          //     background: 'transparent',
          //     // color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          //   },
          // },
          '& .MuiSlider-track': {
            border: 'none',
            color: "transparent"
            // height: "10px"
          },
          '& .MuiSlider-rail': {
            height: 7,
            backgroundColor: "primary",
            opacity: 0.7,
          },
          // '& .MuiSlider-mark': {
          //   backgroundColor: '#bfbfbf',
          //   height: 8,
          //   width: 1,
          //   '&.MuiSlider-markActive': {
          //     opacity: 1,
          //     backgroundColor: 'currentColor',
          //   },
          // },
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {

          select: {
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },

          borderRadius: 4,
          backgroundColor: "#808080",
          fontSize: 12,
          textAlign: "start",
          color: "white",
          width: "100%",
          '&.Mui-selected': {
            backgroundColor: '#616161',
            '&:hover': {
              backgroundColor: '#494949',
            }
          },
          '&:input': {
            padding: 0,
            borderColor: "black"
          },
          '&:focus': {
            borderRadius: 4,
            backgroundColor: '#C4C1C1',
            borderColor: '#C4C1C1',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
          '&:hover': {
            backgroundColor: '#767676',
          },
          '&.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        },
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "#808080",
          borders: 0,
          color: "white"
        }
      }
    }
  },
});

function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    // console.log(index)
  };

  return (
    <div>
      <List sx={{
        width: '100%',
        bgcolor: '#808080',
        overflow: 'auto',
        height: "calc(50vh - 68px)",
        borderRadius: "0px 0px 0px 20px"
        //  '& ul': { padding: 0 },
      }}>
        <ListItemButton selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}>
          <Emotion />
        </ListItemButton >
        <ListItemButton selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}>
          <Emotion />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}>
          <Emotion />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}>
          <Emotion />
        </ListItemButton>
      </List>
    </div>
  );
}

function Emotion() {
  const [visible, setVisible] = useState(true)

  return <div style={{ display: "flex", flexDirection: "row", width: "100%", borderRadius: "5px", justifyContent: "center", alignItems: "center", }}>
    <a style={{
      margin: 0,
      padding: 0,
      color: "white",
      maxWidth: "200px",
      overflow: "hidden"
    }}>Aboba</a>
    <div style={{
      flex: 4
    }}></div>
    <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }} onClick={() => {
      setVisible(!visible)
      console.log(visible)
    }}>
      {visible && <VisibilityTwoToneIcon className="eye" />}
      {!visible && <VisibilityOffTwoToneIcon className="eye" />}
    </div>


  </div>
}

function Emo() {
  return <div style={{
    flex: 1,
    backgroundColor: "#E6E6E6",
    margin: 10,
    borderRadius: "20px"
  }}>
    <div style={{
      display: "flex",
      flexDirection: "row",
      // backgroundColor: "green",
      marginRight: 10,
      marginLeft: 15,
      marginTop: 4,
      marginBottom: 4,
    }}>
      <div style={{
        flex: 0
      }}></div>
      <a style={{
        margin: 0,
        padding: 0,
        color: "black",
      }}>Emotion</a>
      <div style={{
        flex: 5
      }}></div>

      <DeleteOutlineTwoToneIcon className="icon" />
      <CreateTwoToneIcon className="icon" />
      <AddCircleOutlineTwoToneIcon className="icon" />
      <div style={{
        flex: 0
      }}></div>
    </div>

    <SelectedListItem />
  </div>
}

function SelectLabels() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
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
  );
}

function SliderBox() {
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

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [color, setColor] = React.useState("#fff")


  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flex: 1,
      backgroundColor: "#E6E6E6",
      borderRadius: 10,
      margin: 4,
      justifyContent: "center",
      alignContent: "center",
    }}>
      <a style={{
        margin: 0,
        padding: 0,
        color: "black",
        textAlign: "start",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,

      }}>
        Background Color
      </a>
      <div style={{
        margin: 6,
        backgroundColor: color,
        minHeight: 17,
        minWidth: 17,
        borderRadius: "6px",
        borderColor: "black",
        border: "2px solid black"
      }} onClick={handleOpen}>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // backgroundColor: 'white',
          padding: 4,
        }}>
          <CirclePicker
            color={color}
            onChangeComplete={(clr) => { setColor(clr.hex) }} />


        </div>
      </Modal>
    </div>
  );
}

function valuetext(value: number) {
  return `${value}%`;
}

function RangeSlider() {
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

function getMicrophoneVolume(): number {
  let ans = 0.0;
  navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true
    }
  }).then((stream: MediaStream) => {
    ans = getMicrophoneInfo(stream);
  }).catch(
    function (err) {
      console.log(err);
    }
  );

  return ans;
}

function getMicrophoneInfo(stream: MediaStream): number {
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaStreamSource(stream);

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.minDecibels = -127;
  analyser.maxDecibels = 0;
  analyser.smoothingTimeConstant = 0.4;
  audioSource.connect(analyser);

  const volumes = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(volumes);

  let volumeSum = 0;
  for (const volume of volumes) {
    volumeSum += volume;
  }

  return volumeSum / volumes.length;
}

function App() {
  const [mascot, setMascot] = useState({
    blink: false,
    emotion: "",
    lips: false,
    voice: "",
  });

  async function get_mascot() {
    setMascot(await invoke("get_mascot", {}));

  }


  return (
    <ThemeProvider theme={theme}>
      <div className="container" style={{
        margin: 0
      }}>
        <div className="main" style={{
          height: "100vh"
          // height: "calc(100vh - 40px)",
          // paddingTop: 40,
        }}>
          <div className="emotionsNparts" style={{
            // minWidth: 300,
            // backgroundColor: "red",
            justifyContent: "center",
            overflow: "block",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}>
            {/* <h1 style={{}}>emotionsNparts</h1> */}
            <Emo></Emo>
            <Emo></Emo>
          </div>

          <div className="settings" style={{
            // backgroundColor: "green",
            justifyContent: "center",
            minWidth: 400,
            flex: 2,
          }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "row", borderRadius: 10, backgroundColor: "#E6E6E6", justifyContent: "center", alignItems: "center", flex: 1, margin: 4 }}>
                  <KeyboardVoiceTwoToneIcon className="dumbIcon" />
                  <SelectLabels />
                </div>
                <div style={{ display: "flex", flexDirection: "row", borderRadius: 10, backgroundColor: "#E6E6E6", justifyContent: "center", alignItems: "center", flex: 1, margin: 4 }}>
                  <CameraAltTwoToneIcon className="dumbIcon" />
                  <SelectLabels />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <SliderBox />
              <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                backgroundColor: "#E6E6E6",
                borderRadius: 10,
                margin: 4,
              }}>
                <a style={{
                  margin: 0,
                  paddingTop: 4,
                  paddingLeft: 10,
                  color: "black",
                  textAlign: "left",
                }}>
                  Frames Per Second
                </a>
                <SelectLabels />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <RangeSlider />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <BasicModal />
              <div style={{ flex: 1 }}></div>
            </div>

          </div>

          <div className="mascotPlace" style={{
            flex: 5,
            background: "aqua",
            overflow: "auto",
            margin: 10,
            borderRadius: "10px 0 0 0 "
          }}>
            <div className="mascot" style={{

              width: 1000,
              height: 1000, background: "black"

            }}>
              <a style={{color:"white"}}>
                asdasdasd
                </a>
            </div>
          </div>

        </div>






        {/* 
      
      <Grid container spacing={0}>
        <Grid xs={6} md={8}>
          <Emotions/>
        </Grid>
        <Grid xs={6} md={4}>
        <Emotions/>
        </Grid>
        <Grid xs={6} md={4}>
        <Emotions/>
        </Grid>
        <Grid xs={6} md={8}>
        <Emotions/>
        </Grid>
      </Grid> */}
        {/* 

      <Emotions /> */}

        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Age"
        // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume"
        // value={value} 
        // onChange={handleChange} 
        />
        <VolumeUp />
      </Stack>
      <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
        {/* 
      <img src={"./pics/face.png"} className="image vite" style={{ position: "absolute", top: "100px", zIndex: 1, height: "100%", width: "100%", objectFit: "contain" }} />
      <img src={mascot.blink ? "./pics/eyes_c.png" : "./pics/eyes_o.png"} className="image vite" style={{ position: "absolute", top: "100px", zIndex: 2, height: "100%", width: "100%", objectFit: "contain", }} />
      <img src={mascot.lips ? "./pics/mouth_c.png" : "./pics/mouth_o.png"} className="image vite" style={{ position: "absolute", top: "100px", zIndex: 3, height: "100%", width: "100%", objectFit: "contain", }} />
      <div>
        <button type="button" onClick={startSendingMascotData} style={{ zIndex: 4 }}>
          {enableTransmition.forReal + " "}
        </button>
      </div>

      <p>{"BLINK: " + mascot.blink + " | EMOTION: " + mascot.emotion + " |  LIPS: " + mascot.lips + " | VOICE: " + mascot.voice}</p> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
