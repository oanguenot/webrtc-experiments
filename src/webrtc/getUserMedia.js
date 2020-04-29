export const enumerate = async () => {
    let devices = [];

    await navigator.mediaDevices.enumerateDevices().then((devicesFound) => {
        devices = devicesFound;
    });

    return devices;
};

export const getUserMedia = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
};
