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
        <li className="MaterialItem">
            <div className="MaterialItem-left">
                <label className={isSelected ? "MaterialItem-label-active" : "MaterialItem-label"}>
                    {props.device.label}
                </label>
            </div>
            <div className="MaterialItem-right">
                {isSelected ? (
                    <label className="MaterialItem-label">In use</label>
                ) : (
                    <button className="MaterialItem-button" onClick={select}>
                        Select
                    </button>
                )}
            </div>
        </li>
    );
};

const MaterialsList = ({ dispatch }) => {
    const materials = useContext(MaterialsContext);

    useEffect(() => {
        fetchDevices();
    }, [materials.authorized]);

    useEffect(() => {
        navigator.mediaDevices.ondevicechange = (device) => {
            fetchDevices();
        };
    }, [materials]);

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
            <div className="MaterialsList-items">
                <label className="MaterialsList-items-title">Microphone</label>
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
            </div>
            <div className="MaterialsList-items">
                <label className="MaterialsList-items-title">Camera</label>
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
        </div>
    );
};

export default MaterialsList;
