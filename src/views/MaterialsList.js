import React, { useState, useEffect, useContext } from "react";
import MaterialsContext from "../contexts/materialsContext";

import { enumerate, getFirstMicrophone, getFirstCamera, filterByMicrophone, filterByCamera } from "../webrtc/Materials";

import { SET_MICROPHONE, SET_CAMERA, SET_DEVICES } from "../actions/materialsActions";

import "./MaterialsList.css";

const MaterialItem = (props) => {
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

const MaterialsList = ({ dispatch }) => {
    const materials = useContext(MaterialsContext);

    const isSelectedMicrophone = (device) => {
        return materials.microphone && materials.microphone.id === device.id;
    };

    const isSelectedCamera = (device) => {
        return materials.camera && materials.camera.id === device.id;
    };

    const fetchDevices = async () => {
        const devices = await enumerate();
        dispatch({ type: SET_DEVICES, payload: devices });
        updateMicrophoneInUse(getFirstMicrophone(devices));
        updateCameraInUse(getFirstCamera(devices));
    };

    const updateDeviceInUse = (device) => {
        if (device.isAMicrophone) {
            updateMicrophoneInUse(device);
        } else {
            updateCameraInUse(device);
        }
    };

    const updateMicrophoneInUse = (microphone) => {
        dispatch({ type: SET_MICROPHONE, payload: microphone });
    };

    const updateCameraInUse = (camera) => {
        dispatch({ type: SET_CAMERA, payload: camera });
    };

    return (
        <div>
            <button className="" onClick={fetchDevices}>
                Devices
            </button>
            <br />
            <label>Microphone(s)</label>
            <ul>
                {filterByMicrophone(materials.list).map((device, index) => {
                    return (
                        <MaterialItem
                            key={index}
                            device={device}
                            selected={isSelectedMicrophone(device)}
                            onSelected={updateDeviceInUse}
                        />
                    );
                })}
            </ul>
            <label>Camera</label>
            <ul>
                {filterByCamera(materials.list).map((device, index) => {
                    return (
                        <MaterialItem
                            key={index}
                            device={device}
                            selected={isSelectedCamera(device)}
                            onMicrophoneSelected={updateMicrophoneInUse}
                            onSelected={updateDeviceInUse}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default MaterialsList;
