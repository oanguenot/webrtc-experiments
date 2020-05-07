export const getUserMedia = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
};
