import { useReducer,useContext,createContext } from "react";
import { initialState,Reducer } from "./ContextReducer";

const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
    return (
        <Context.Provider value={useReducer(Reducer, initialState)}>
            {children}
        </Context.Provider>
    )
}
export const UseContext = ()  =>  useContext(Context);
