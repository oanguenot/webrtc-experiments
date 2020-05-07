class Material {
    constructor(device) {
        this._device = device;
    }

    get label() {
        return this._device ? this._device.label : "";
    }

    get id() {
        return this._device ? this._device.deviceId : "";
    }

    get groupId() {
        return this._device ? this._device.groupId : "";
    }

    get kind() {
        return this._device ? this._device.kind : "";
    }

    get input() {
        if (!this._device) {
            return false;
        }

        return this._device.kind.includes("input");
    }

    get output() {
        if (!this._device) {
            return false;
        }

        return this._device.kind.includes("output");
    }

    get isAMicrophone() {
        if (!this._device) {
            return false;
        }

        return this._device.kind.includes("audio");
    }

    get isACamera() {
        if (!this._device) {
            return false;
        }

        return this._device.kind.includes("video");
    }

    toString() {
        if (!this._device) {
            return "no material";
        }

        return `${this._device.label}|${this._device.deviceId}`;
    }
}

export default Material;
