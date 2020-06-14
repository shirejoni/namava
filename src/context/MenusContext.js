import React, {createContext, useContext, useReducer} from "react";

const MenusContext = createContext(null);


const initializeState = {
    data: null,
    home: null,
    loading: false,
    errors: [],
    succeeded: false,
}

export const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_DATA": "SET_DATA",
    "SET_ERRORS": "SET_ERRORS",
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        case types.SET_DATA:
            state = {...state, loading: false, errors: [], succeeded: true, data: action.data, home: action.home};
            break;
        case types.SET_ERRORS:
            state = {...state, loading: false, errors: action.errors, data: null, home: null, succeeded: false};
            break;

        default:
            throw Error(`An unknown Action to Menus Reducer ${action.type}`);
    }

    return state;
};

const MenusProvider = ({children}) => {
    let [state, dispatch] = useReducer(reducer, initializeState, () => initializeState);

    return (
        <MenusContext.Provider value={{state, dispatch}}>
            {children}
        </MenusContext.Provider>
    )
}

const useMenus = () => {
    let context = useContext(MenusContext);
    if(!context) {
        throw Error("useMenus should be use inside MenusProvider");
    }
    let {state, dispatch} = context;

    return {
        state,
        dispatch,
    }
}


export {MenusProvider, useMenus};
