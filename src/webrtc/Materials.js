import Material from "./Material";

export const filterByMicrophone = (listOfMaterials) => {
    if (!listOfMaterials) {
        return [];
    }

    return listOfMaterials.filter((material) => {
        return material.isAMicrophone && material.input;
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

export const hasAMicrophone = (listOfMaterials) => {
    return filterByMicrophone(listOfMaterials).length > 0;
};

export const hasACamera = (listOfMaterials) => {
    return filterByCamera(listOfMaterials).length > 0;
};

export const enumerate = async () => {
    var materials = [];

    await navigator.mediaDevices.enumerateDevices().then((devicesFound) => {
        materials = devicesFound.map((device) => {
            return new Material(device);
        });
    });

    return materials;
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
