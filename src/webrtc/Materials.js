import Material from "./Material";

export const filterByMicrophone = (listOfMaterials) => {
    if (!listOfMaterials) {
        return [];
    }

    return listOfMaterials.filter((material) => {
        return material.isAMicrophone;
    });
};

export const filterByCamera = (listOfMaterials) => {
    if (!listOfMaterials) {
        return [];
    }
    return listOfMaterials.filter((material) => {
        return material.isACamera && material.input;
    });
};

export const filterBySpeaker = (listOfMaterials) => {
    if (!listOfMaterials) {
        return [];
    }
    return listOfMaterials.filter((material) => {
        return material.isASpeaker;
    });
};

export const hasAMicrophone = (listOfMaterials) => {
    return filterByMicrophone(listOfMaterials).length > 0;
};

export const hasACamera = (listOfMaterials) => {
    return filterByCamera(listOfMaterials).length > 0;
};

export const hasASpeaker = (listOfMaterials) => {
    return filterBySpeaker(listOfMaterials).length > 0;
};

export const enumerate = async () => {
    var materials = [];

    try {
        await navigator.mediaDevices.enumerateDevices().then((devicesFound) => {
            materials = devicesFound.map((device) => {
                return new Material(device);
            });
        });

        return materials;
    } catch (err) {
        console.log("[enumerate] error", err);
    }
};

export const getFirstMicrophone = (listOfMaterials) => {
    if (!hasAMicrophone(listOfMaterials)) {
        return null;
    }

    return filterByMicrophone(listOfMaterials)[0];
};

export const getFirstCamera = (listOfMaterials) => {
    if (!hasACamera(listOfMaterials)) {
        return null;
    }

    return filterByCamera(listOfMaterials)[0];
};

export const getFirstSpeaker = (listOfMaterials) => {
    if (!hasASpeaker(listOfMaterials)) {
        return null;
    }

    return filterBySpeaker(listOfMaterials)[0];
};

export const diff = (withCurrent, devices) => {
    let diff = {
        count: 0,
        list: [],
        firstTime: withCurrent.length === 0,
    };

    const current = withCurrent.filter((elt) => {
        return elt.id.length > 0 && elt.label.length > 0;
    });

    if (devices.length === current.length) {
        return diff;
    }

    if (devices.length > current.length) {
        let newDevices = devices.filter((device) => {
            return !current.some((elt) => elt.id === device.id);
        });

        return {
            count: newDevices.length,
            list: newDevices,
            firstTime: current.length === 0,
        };
    } else {
        // devices removed
        let removedDevices = current.filter((device) => {
            return !devices.some((elt) => {
                return elt.id === device.id;
            });
        });

        return {
            count: 0 - removedDevices.length,
            list: removedDevices,
            firstTime: current.length === 0,
        };
    }
};

export const selectMicrophoneToUse = (count, current, update, list) => {
    if (count > 0) {
        const newMicrophone = getFirstMicrophone(update);
        if (newMicrophone && (!current || newMicrophone.id !== current.id)) {
            return newMicrophone;
        }
    } else if (count < 0) {
        if (update.some((elt) => elt.id === current.id)) {
            const newMicrophone = getFirstMicrophone(list);
            return newMicrophone;
        }
    } else {
        if (!current) {
            const newMicrophone = getFirstMicrophone(list);
            return newMicrophone;
        }
    }
};

export const selectCameraToUse = (count, current, update, list) => {
    if (count > 0) {
        const newCamera = getFirstCamera(update);
        if (newCamera && (!current || newCamera.id !== current.id)) {
            return newCamera;
        }
    } else if (count < 0) {
        if (update.some((elt) => elt.id === current.id)) {
            const newCamera = getFirstCamera(list);
            return newCamera;
        }
    } else {
        if (!current) {
            const newCamera = getFirstCamera(list);
            return newCamera;
        }
    }
};

export const selectSpeakerToUse = (count, current, update, list) => {
    if (count > 0) {
        const newSpeaker = getFirstSpeaker(update);
        if (newSpeaker && (!current || newSpeaker.id !== current.id)) {
            return newSpeaker;
        }
    } else if (count < 0) {
        if (update.some((elt) => elt.id === current.id)) {
            const newSpeaker = getFirstSpeaker(list);
            return newSpeaker;
        }
    } else {
        if (!current) {
            const newSpeaker = getFirstSpeaker(list);
            return newSpeaker;
        }
    }
};
