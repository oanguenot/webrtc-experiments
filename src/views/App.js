import React, { useReducer } from "react";
import "./App.css";

import Local from "./Local";
import MaterialsList from "./MaterialsList";

import { materialsReducer, initialMaterialsState } from "../reducers/materialsReducer";

const App = () => {
    const [materials, dispatch] = useReducer(materialsReducer, initialMaterialsState);

    return (
        <div className="App">
            <header className="App-header">
                <Local materials={materials} />
                <MaterialsList dispatch={dispatch} materials={materials} />
            </header>
        </div>
    );
};

export default App;
