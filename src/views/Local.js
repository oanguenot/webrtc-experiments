import React, { useState, useEffect, useRef } from "react";
import "./Local.css";

import { getUserMedia } from "../webrtc/getUserMedia";

const Local = ({ materials }) => {
    const [stream, setStream] = useState();
    const videoElt = useRef();

    useEffect(() => {
        if (stream) {
            videoElt.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        requestMedia();
    }, [materials.camera, materials.microphone]);

    const getConstraints = () => {
        const audioConstraints =
            materials.microphone && materials.microphone.id ? { deviceId: { exact: materials.microphone.id } } : true;
        const videoConstraints =
            materials.camera && materials.camera.id
                ? {
                      deviceId: { exact: materials.camera.id },
                      width: { exact: 640 },
                      height: { exact: 480 },
                  }
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

export default Local;
