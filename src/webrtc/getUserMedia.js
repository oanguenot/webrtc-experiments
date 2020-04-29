export const enumerate = async () => {
    let devices = [];

    await navigator.mediaDevices.enumerateDevices().then((devicesFound) => {
        devices = devicesFound;
    });

    return devices;
};

export const getUserMedia = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("Stream", stream);
    return stream;
};

// export const enumerate = async () => {
//     await getUserMedia(constraints);
//     return await enumerateDevices();
// };
