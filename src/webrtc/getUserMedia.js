import Stream from "./Stream";

export const getUserMedia = async (constraints) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return new Stream(stream);
    } catch (err) {
        console.log("getUserMedia error", err);
        return null;
    }
};

export const getConstraints = (microphone, camera) => {
    const audioConstraints = microphone && microphone.id ? { deviceId: { exact: microphone.id } } : true;
    const videoConstraints =
        camera && camera.id
            ? {
                  deviceId: { exact: camera.id },
                  width: { exact: 640 },
                  height: { exact: 480 },
              }
            : true;

    return {
        audio: audioConstraints,
        video: videoConstraints,
    };
};
