import React, { useState, useEffect, useContext } from "react";
import MaterialsContext from "../contexts/materialsContext";
import "./MaterialsList.css";

import {
    enumerate,
    filterByMicrophone,
    filterByCamera,
    filterBySpeaker,
    diff,
    selectMicrophoneToUse,
    selectCameraToUse,
    selectSpeakerToUse,
} from "../webrtc/Materials";

import {
    SET_MICROPHONE,
    SET_CAMERA,
    SET_DEVICES,
    SET_SPEAKER,
    SET_MICROPHONE_CAMERA,
    SET_MICROPHONE_CAMERA_SPEAKER,
} from "../actions/materialsActions";

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

    const [deviceChanged, setChange] = useState(false);

    useEffect(() => {
        if (deviceChanged) {
            setTimeout(() => {
                fetchDevices();
                setChange(false);
            }, 2000);
        }
    }, [deviceChanged]);

    useEffect(() => {
        fetchDevices();
    }, [materials.authorized]);

    useEffect(() => {
        navigator.mediaDevices.ondevicechange = () => {
            setChange(true);
        };
    }, [materials]);

    const isSelectedMicrophone = (device) => {
        return materials.microphone && materials.microphone.id === device.id;
    };

    const isSelectedCamera = (device) => {
        return materials.camera && materials.camera.id === device.id;
    };

    const isSelectedSpeaker = (device) => {
        return materials.speaker && materials.speaker.id === device.id;
    };

    const fetchDevices = async () => {
        const devices = await enumerate();
        const result = diff(materials.list, devices);

        if (result.firstTime || (result.count !== 0 && !result.firstTime)) {
            dispatch({ type: SET_DEVICES, payload: devices });

            const microphone = selectMicrophoneToUse(result.count, materials.microphone, result.list, devices);
            const camera = selectCameraToUse(result.count, materials.camera, result.list, devices);
            const speaker = selectSpeakerToUse(result.count, materials.speaker, result.list, devices);

            if (microphone && camera && speaker) {
                updateAll(microphone, camera, speaker);
            } else if (microphone && camera) {
                updateMicrophoneAndCameraInUse(microphone, camera);
            } else if (microphone) {
                updateMicrophoneInUse(microphone);
            } else if (camera) {
                updateCameraInUse(camera);
            } else if (speaker) {
                updateSpeakerToUse(speaker);
            }
        }
    };

    const updateDeviceInUse = (device) => {
        if (device.isAMicrophone) {
            updateMicrophoneInUse(device);
        } else if (device.isACamera) {
            updateCameraInUse(device);
        } else if (device.isASpeaker) {
            updateSpeakerToUse(device);
        }
    };

    const updateMicrophoneInUse = (microphone) => {
        dispatch({ type: SET_MICROPHONE, payload: microphone });
    };

    const updateCameraInUse = (camera) => {
        dispatch({ type: SET_CAMERA, payload: camera });
    };

    const updateSpeakerToUse = (speaker) => {
        dispatch({ type: SET_SPEAKER, payload: speaker });
    };

    const updateMicrophoneAndCameraInUse = (microphone, camera) => {
        dispatch({ type: SET_MICROPHONE_CAMERA, payload: { microphone, camera } });
    };

    const updateAll = (microphone, camera, speaker) => {
        dispatch({ type: SET_MICROPHONE_CAMERA_SPEAKER, payload: { microphone, camera, speaker } });
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
                                onSelected={updateDeviceInUse}
                            />
                        );
                    })}
                </ul>
            </div>
            <div className="MaterialsList-items">
                <label className="MaterialsList-items-title">Speakers</label>
                <ul>
                    {filterBySpeaker(materials.list).map((device, index) => {
                        return (
                            <MaterialItem
                                key={index}
                                device={device}
                                selected={isSelectedSpeaker(device)}
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
