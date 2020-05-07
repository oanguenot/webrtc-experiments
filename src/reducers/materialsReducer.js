import { SET_MICROPHONE, SET_CAMERA, SET_DEVICES } from "../actions/materialsActions";

const initialMaterialsState = {
    list: [],
    camera: null,
    microphone: null,
};

const materialsReducer = (state = initialMaterialsState, action) => {
    switch (action.type) {
        case SET_DEVICES:
            return { ...state, list: action.payload };
        case SET_MICROPHONE:
            return { ...state, microphone: action.payload };
        case SET_CAMERA:
            return { ...state, camera: action.payload };
        default:
            return state;
    }
};

export { materialsReducer, initialMaterialsState };
