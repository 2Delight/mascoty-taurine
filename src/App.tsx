import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { flushSync } from 'react-dom';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async';
import { Button, Card, CardActions, CardContent, createTheme, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, MenuItem, Modal, Select, SelectChangeEvent, Slider, Stack, ThemeProvider, Typography } from "@mui/material";
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
import { SketchPicker } from 'react-color';

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
          fontSize: 14,
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
          fontSize: 14,
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
      fontSize: 14,
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
      fontSize: 14,
      color: "black",
    }}>
      Mic Output
    </a>
    <Stack spacing={2} direction="row" sx={{
      backgroundColor: "#808080",
      borderRadius: 2, fles: 2
    }} alignItems="center">
      {/* <VolumeDown className="dumbIcon" /> */}
      <Slider aria-label="Volume"
        sx={{
          marginRight: 2,
          marginLeft: 2,
          padding: 2,

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
        fontSize: 14,
        color: "black",
        textAlign: "start",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,

      }}>
        Background Color
      </a>
      <div style={{
        margin: 10,
        backgroundColor: "black",
        minHeight: 20,
        minWidth: 20,
      }} onClick={handleOpen}>
        <div style={{
          margin: 1, backgroundColor: color, minHeight: 18,
          minWidth: 18,
        }}> </div>
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
          backgroundColor: 'white',
          padding: 4,
        }}>
          <SketchPicker
            color={color}
            onChangeComplete={(clr) => { setColor(clr.hex) }} />
        </div>
      </Modal>
    </div>
  );
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
                  fontSize: 14,
                  color: "black",
                  textAlign: "left",
                }}>
                  Frames Per Second
                </a>
                <SelectLabels />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <SliderBox />
              <SliderBox />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <BasicModal />
              <div style={{flex: 1}}></div>
            </div>

          </div>

          <div className="mascotPlace" style={{
            flex: 5,
            background: "aqua",
            overflow: "auto",
          }}>
            <div className="mascot" style={{

              width: 1000,
              height: 1000, background: "black"

            }}>
              asdsad
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
