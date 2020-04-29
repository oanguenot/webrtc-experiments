import React, { useState, useEffect, useRef } from "react";
import { getUserMedia } from "./webrtc/getUserMedia";

import "./Videos.css";

const Videos = (props) => {
    const [camera, setCamera] = useState(props.camera);
    const [microphone, setMicrophone] = useState(props.microphone);
    const [stream, setStream] = useState();
    const videoElt = useRef();

    useEffect(() => {
        if (stream) {
            videoElt.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        setCamera(props.camera);
    }, [props.camera]);

    useEffect(() => {
        setMicrophone(props.microphone);
    }, [props.microphone]);

    useEffect(() => {
        requestMedia();
    }, [microphone, camera]);

    const getConstraints = () => {
        const audioConstraints =
            microphone && microphone.deviceId ? { deviceId: { exact: microphone.deviceId } } : true;
        const videoConstraints =
            camera && camera.deviceId
                ? { deviceId: { exact: camera.deviceId }, width: { exact: 640 }, height: { exact: 480 } }
                : true;

        return {
            audio: audioConstraints,
            video: videoConstraints,
        };
    };

    const requestMedia = async () => {
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
        }

        const constraints = getConstraints();

        const newStream = await getUserMedia(constraints);
        setStream(newStream);
    };

    const currentCameraTrack = stream ? stream.getVideoTracks()[0] : null;
    const currentMicrophoneTrack = stream ? stream.getAudioTracks()[0] : null;

    var currentCameraId = "-";
    if (currentCameraTrack) {
        currentCameraId = currentCameraTrack.getSettings().deviceId;
    }

    var currentMicrophoneId = "-";
    if (currentMicrophoneTrack) {
        currentMicrophoneId = currentMicrophoneTrack.getSettings().deviceId;
    }

    return (
        <div className="Video-area">
            <div>
                <video ref={videoElt} id="local" className="Video-local" autoPlay playsInline></video>
            </div>
            <h5 className="Video-name">{currentCameraTrack ? currentCameraTrack.label : "default"}</h5>
            <h6 className="Video-name">
                <small>{currentMicrophoneTrack ? currentMicrophoneTrack.label : "default"}</small>
            </h6>
            <hr />
            <div className="Video-id">{currentCameraId}</div>
            <div className="Video-id">{currentMicrophoneId}</div>
        </div>
    );
};

export default Videos;
