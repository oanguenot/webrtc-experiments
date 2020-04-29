import React, { useState } from "react";
import "./App.css";

//import "webrtc-adapter";

import Videos from "./Videos";
import Devices from "./Devices";

const App = () => {
    const [selectedMicrophone, setMicrophone] = useState({ label: "default", deviceId: null });
    const [selectedCamera, setCamera] = useState({ label: "default", deviceId: null });

    const onMicrophoneChanged = (device) => {
        setMicrophone(device);
    };

    const onCameraChanged = (device) => {
        setCamera(device);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Videos microphone={selectedMicrophone} camera={selectedCamera} />
                <Devices onMicrophoneChanged={onMicrophoneChanged} onCameraChanged={onCameraChanged} />
            </header>
        </div>
    );
};

export default App;
