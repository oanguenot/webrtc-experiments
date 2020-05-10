import {
    SET_MICROPHONE,
    SET_CAMERA,
    SET_DEVICES,
    SET_MICROPHONE_CAMERA,
    AUTHORIZATION_GRANTED,
} from "../actions/materialsActions";

const initialMaterialsState = {
    list: [],
    camera: null,
    microphone: null,
    authorized: false,
};

const materialsReducer = (state = initialMaterialsState, action) => {
    switch (action.type) {
        case SET_DEVICES:
            return { ...state, list: action.payload };
        case SET_MICROPHONE:
            return { ...state, microphone: action.payload };
        case SET_CAMERA:
            return { ...state, camera: action.payload };
        case SET_MICROPHONE_CAMERA:
            return { ...state, microphone: action.payload.microphone, camera: action.payload.camera };
        case AUTHORIZATION_GRANTED:
            return { ...state, authorized: action.payload };
        default:
            return state;
    }
};

export { materialsReducer, initialMaterialsState };
