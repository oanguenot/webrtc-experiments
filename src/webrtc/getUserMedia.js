export const enumerate = async () => {
    let devices = [];

    await navigator.mediaDevices.enumerateDevices().then((devicesFound) => {
        devices = devicesFound;
        window.devices = devices;
    });

    return devices;
};

export const getUserMedia = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
};
