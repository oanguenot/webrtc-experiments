import React, { useReducer } from "react";
import "./App.css";

import Local from "./Local";
import MaterialsList from "./MaterialsList";
import MaterialsContext from "../contexts/materialsContext";

import { materialsReducer, initialMaterialsState } from "../reducers/materialsReducer";

const App = () => {
    const [materials, dispatch] = useReducer(materialsReducer, initialMaterialsState);

    return (
        <div className="App">
            <section className="App-container">
                <div className="App-left-half"></div>
                <div className="App-right-half">
                    <MaterialsContext.Provider value={materials}>
                        <Local dispatch={dispatch} />
                        <MaterialsList dispatch={dispatch} />
                    </MaterialsContext.Provider>
                </div>
            </section>
        </div>
    );
};

export default App;
