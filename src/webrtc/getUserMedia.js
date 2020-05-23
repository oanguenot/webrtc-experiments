import Stream from "./Stream";

export const getUserMedia = async (constraints) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return new Stream(stream);
    } catch (err) {
        console.log("[getusermedia] error", err);
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

export const getNullConstraints = () => {
    return null;
};

export const getUndefinedConstraints = () => {
    return undefined;
};

export const getEmptyConstraints = () => {
    return { audio: true };
};

export const getBadIdConstraints = () => {
    return { audio: { deviceId: { exact: "123456" } } };
};

export const getOtherConstraints = () => {
    const audioConstraints = {
        sampleSize: 8,
        echoCancellation: false,
    };
    const videoConstraints = {
        resizeMode: "crop-and-scale",
        viewportHeight: 480,
    };

    return {
        audio: audioConstraints,
        video: videoConstraints,
    };
};
