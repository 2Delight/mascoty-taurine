
import { createTheme, ThemeProvider } from "@mui/material";
import { bright, interactActiveGray, interactActiveHoverGray, interactGray, interactHoverGray } from "./Colors";
export const theme = createTheme({
  palette: {
    primary: {
      main: interactGray
    },
    secondary: {
      main: interactHoverGray
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
            backgroundColor: interactActiveGray,
            '&:hover': {
              backgroundColor: interactActiveHoverGray,
            }
          },
          '&:hover': {
            backgroundColor: interactHoverGray,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {

        select: {
          // backgroundColor: "black",
          borderColor: "transparent",
          borderWidth:0,
          filter: "",
          padding: 5,
        },
        outlined: {
          borderColor: "transparent",
          filter: "",
          borderWidth:0,
        }

      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            height: 14,
            width: 20,
            // border: '2px solid #E6E6E6',
            borderRadius: 2,
            backgroundColor: 'black',
            // boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &.Mui-active': {
              boxShadow:
                '0 0 0 rgba(0,0,0,0),0 0 0 rgba(0,0,0,0),0 0 0 0 rgba(0,0,0,0)',
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow:
                  '0 0 0 rgba(0,0,0,0),0 0 0 rgba(0,0,0,0),0 0 0 0 rgba(0,0,0,0)',
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
          backgroundColor: interactGray,
          fontSize: 12,
          textAlign: "start",
          color: "white",
          width: "100%",
          '&.Mui-selected': {
            backgroundColor: interactActiveGray,
            '&:hover': {
              backgroundColor: interactActiveHoverGray,
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
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
          '&:hover': {
            backgroundColor: interactHoverGray,
          },
          '&.MuiOutlinedInput-notchedOutline': {
            borderColor: bright,
          },
        },
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: interactGray,
          borders: 0,
          color: bright
        }
      }
    }
  },
});