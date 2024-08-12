/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */


import {createTheme} from "@mui/material";
import {buttonFont, normalFont, titleFont} from "@/utils/theme/font";

const dark = createTheme({
    shape: {
        borderRadius: 0
    },
    palette: {
        background: {
            default: "#000010",
            paper: "#00000e",
        },
        primary: {
            light: "#f1f1f1",
            main: "#f1f1f1",
            dark: "#f1f1f1",
            contrastText: "#000030",
        },
        secondary: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffffff",
            contrastText: "#0e0e0e",
        },
        success: {
            light: "#006000",
            main: "#006000",
            dark: "#006000",
            contrastText: "#ffffff",
        },
        error: {
            light: "#f00000",
            main: "#f00000",
            dark: "#f00000",
            contrastText: "#ffffff",
        },
        info: {
            light: "#0000c0",
            main: "#0000c0",
            dark: "#0000c0",
            contrastText: "#ffffff",
        },
        mode: "dark"
    },

    typography: {
        fontFamily: normalFont.style.fontFamily,
        h1: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 600,
        },
        h2: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 600
        },
        h3: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 600
        },
        h4: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 600
        },
        h5: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 600
        },
        h6: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 600
        },
        subtitle1: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 500
        },
        subtitle2: {
            fontFamily: titleFont.style.fontFamily,
            color: "#ffffff",
            fontWeight: 500
        },
        body1: {
            color: "#e0e0e0",
            fontWeight: 400,
            lineHeight: 1.5,
            fontSize: 16
        },
        body2: {
            color: "#e0e0e0",
            fontWeight: 400,
            lineHeight: 1.5,
            fontSize: 12
        },
        caption: {
            color: "#e0e0e0",
            fontWeight: 400,
        },
        button: {
            fontFamily: buttonFont.style.fontFamily,
            color: "#e0e0e0",
            fontWeight: 400
        },
        overline: {
            color: "#e0e0e0",
            fontWeight: 400
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "none",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    letterSpacing: ".5px"
                },
                sizeLarge: {
                    borderRadius: 0,
                    height: 48,
                    fontSize: 18,
                    padding: "0 24px",
                    lineHeight: 1,
                },
                sizeMedium: {
                    borderRadius: 0,
                    fontSize: 16,
                    padding: "0 24px",
                    height: 42
                },
                sizeSmall: {
                    borderRadius: 0,
                    fontSize: 14,
                    lineHeight: 1,
                    padding: "0 12px",
                    height: 32
                }
            }
        }
    }
})

export default dark