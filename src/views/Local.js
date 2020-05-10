import React, { useState, useEffect, useRef, useContext } from "react";
import "./Local.css";

import { AUTHORIZATION_GRANTED } from "../actions/materialsActions";
import MaterialsContext from "../contexts/materialsContext";

import { getUserMedia, getConstraints } from "../webrtc/getUserMedia";

const Local = ({ dispatch }) => {
    const materials = useContext(MaterialsContext);

    const [stream, setStream] = useState();
    const videoElt = useRef();

    useEffect(() => {
        if (stream) {
            videoElt.current.srcObject = stream.mediaStream;
        }
    }, [stream]);

    useEffect(() => {
        requestMedia();
    }, []);

    useEffect(() => {
        requestMedia();
    }, [materials.camera, materials.microphone]);

    const requestMedia = async () => {
        let microphoneInUse = materials.microphone,
            cameraInUse = materials.camera;

        const constraints = getConstraints(microphoneInUse, cameraInUse);

        if (stream) {
            stream.stopAudioIfNotFrom(microphoneInUse);
            stream.stopVideoIfNotFrom(cameraInUse);
        }

        const newStream = await getUserMedia(constraints);

        setStream(newStream);
        if (!materials.authorized) {
            dispatch({ type: AUTHORIZATION_GRANTED, payload: true });
        }
    };

    let microphoneId = stream ? stream.idOfFirstMicrophone : "-",
        microphoneLabel = stream ? stream.labelOfFirstMicrophone : "-",
        cameraId = stream ? stream.idOfFirstCamera : "-",
        cameraLabel = stream ? stream.labelOfFirstCamera : "-";

    return (
        <div className="Video-area">
            <div>
                <video ref={videoElt} id="local" className="Video-local" autoPlay playsInline></video>
            </div>
            <h5 className="Video-name">{cameraLabel}</h5>
            <h6 className="Video-name">
                <small>{microphoneLabel}</small>
            </h6>
            <hr />
            <div className="Video-id">{cameraId}</div>
            <div className="Video-id">{microphoneId}</div>
        </div>
    );
};

export default Local;
