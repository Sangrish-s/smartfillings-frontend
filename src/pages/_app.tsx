/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */


import type {AppProps} from "next/app";
import {CssBaseline, ThemeProvider} from "@mui/material";
import dark from "@/utils/theme/dark";
import {Provider} from "react-redux";
import store from "@/store/files/store";

export default function App({Component, pageProps}: AppProps) {

    return (
        <ThemeProvider theme={dark}>
            <Provider store={store}>
                <CssBaseline/>
                <Component {...pageProps} />
            </Provider>
        </ThemeProvider>
    );
}
