
import { createTheme, ThemeProvider} from "@mui/material";
export const theme = createTheme({
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