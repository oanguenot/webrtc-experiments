import React, { useState, useEffect } from "react";
import { enumerate } from "./webrtc/getUserMedia";

import "./Devices.css";

const Device = (props) => {
    const [isSelected, setActive] = useState(props.selected);

    useEffect(() => {
        setActive(props.selected);
    }, [props.selected]);

    const select = () => {
        props.onSelected(props.device);
    };

    return (
        <li>
            <label className="Device-label">{props.device.label}</label>
            <button onClick={select}>Select</button>
            <label className="Device-active">{isSelected ? "ACTIVE" : ""}</label>
        </li>
    );
};

const Devices = (props) => {
    const [devices, setDevices] = useState([]);
    const [selectedMicrophoneDevice, setMicrophoneInUse] = useState(null);
    const [selectedCameraDevice, setCameraInUse] = useState(null);

    const selectFirst = (list, kind) => {
        const filteredList = filterBy(kind, list);

        if (!filteredList || filteredList.length === 0) {
            return;
        }

        const selectedDevice = filteredList[0];

        if (kind === "audioinput") {
            setMicrophoneInUse(selectedDevice);
            props.onMicrophoneChanged(selectedDevice);
        } else {
            setCameraInUse(selectedDevice);
            props.onCameraChanged(selectedDevice);
        }
    };

    const isSelectedMicrophone = (device) => {
        return selectedMicrophoneDevice && selectedMicrophoneDevice.deviceId === device.deviceId;
    };

    const isSelectedCamera = (device) => {
        return selectedCameraDevice && selectedCameraDevice.deviceId === device.deviceId;
    };

    const fetchDevices = async () => {
        const devices = await enumerate();
        setDevices(devices);
        selectFirst(devices, "audioinput");
        selectFirst(devices, "videoinput");
    };

    const filterBy = (kind, devices) => {
        return devices.filter((device) => {
            return device.kind === kind;
        });
    };

    const onSelected = (device) => {
        if (device.kind === "audioinput") {
            setMicrophoneInUse(device);
            props.onMicrophoneChanged(device);
        } else {
            setCameraInUse(device);
            props.onCameraChanged(device);
        }
    };

    return (
        <div>
            <button className="" onClick={fetchDevices}>
                Devices
            </button>
            <br />
            <label>Microphone(s)</label>
            <ul>
                {filterBy("audioinput", devices).map((device, index) => {
                    return (
                        <Device
                            key={index}
                            device={device}
                            selected={isSelectedMicrophone(device)}
                            onSelected={onSelected}
                        />
                    );
                })}
            </ul>
            <label>Camera</label>
            <ul>
                {filterBy("videoinput", devices).map((device, index) => {
                    return (
                        <Device
                            key={index}
                            device={device}
                            selected={isSelectedCamera(device)}
                            onSelected={onSelected}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Devices;
