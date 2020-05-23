import {
    SET_MICROPHONE,
    SET_CAMERA,
    SET_SPEAKER,
    SET_DEVICES,
    SET_MICROPHONE_CAMERA,
    SET_MICROPHONE_CAMERA_SPEAKER,
    AUTHORIZATION_GRANTED,
} from "../actions/materialsActions";

const initialMaterialsState = {
    list: [],
    camera: null,
    microphone: null,
    speaker: null,
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
        case SET_SPEAKER:
            return { ...state, speaker: action.payload };
        case SET_MICROPHONE_CAMERA:
            return { ...state, microphone: action.payload.microphone, camera: action.payload.camera };
        case SET_MICROPHONE_CAMERA_SPEAKER:
            return {
                ...state,
                microphone: action.payload.microphone,
                camera: action.payload.camera,
                speaker: action.payload.speaker,
            };

        case AUTHORIZATION_GRANTED:
            return { ...state, authorized: action.payload };
        default:
            return state;
    }
};

export { materialsReducer, initialMaterialsState };
