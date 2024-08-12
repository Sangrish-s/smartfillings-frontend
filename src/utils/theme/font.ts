/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import {Poppins, PT_Sans_Caption, Rajdhani, Roboto} from "next/font/google";


export const titleFont = Poppins({
    weight: ['100','200','300','400','500','600','700','800','900'],
    preload: true,
    style: "normal",
    subsets: ['latin', 'latin-ext']
})

export const normalFont = Poppins({
    weight: ['100','200','300','400','500','600','700','800','900'],
    preload: true,
    style: "normal",
    subsets: ['latin', 'latin-ext']
})

export const buttonFont = Rajdhani({
    weight: ["300", "400", "500", "600", "700"],
    style: "normal",
    preload: true,
    subsets: ["latin", "latin-ext"]
})