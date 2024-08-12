import React from 'react';
import Lottie from 'react-lottie';
import animationData from './folder.json';

const FolderLoading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{width: 200, height: 200, margin: "auto"}}>
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default FolderLoading;