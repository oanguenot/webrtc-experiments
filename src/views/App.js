import React, { useReducer, createContext } from "react";
import "./App.css";

import Local from "./Local";
import MaterialsList from "./MaterialsList";
import MaterialsContext from "../contexts/materialsContext";

import { materialsReducer, initialMaterialsState } from "../reducers/materialsReducer";

const App = () => {
    const [materials, dispatch] = useReducer(materialsReducer, initialMaterialsState);

    return (
        <div className="App">
            <header className="App-header">
                <MaterialsContext.Provider value={materials}>
                    <Local />
                    <MaterialsList dispatch={dispatch} />
                </MaterialsContext.Provider>
            </header>
        </div>
    );
};

export default App;
