import React, {FC} from 'react';
import {Box} from "@mui/material";
import Lottie from "react-lottie";
import animationData from "@/components/loader/scanning.json";

const ScanningLoader: FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Box sx={{width: "100%", height: "100%", position: "absolute", zIndex: 1, top: 0, right: 0, bottom: 0, opacity: .8 }}>
            <Lottie options={defaultOptions}/>
        </Box>
    );
};

export default ScanningLoader;