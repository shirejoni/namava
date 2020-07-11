import React, {createContext, useContext, useReducer} from "react";
import {useMenus} from "./MenusContext";

const FilterContext = createContext(null);


const initializeState = {
    filters: {
        filtersId: []
    },
    loading: false,
    errors: false,
    genre: false,
    done: false,
    active: false,
}

export const types = {
    "SET_LOADING": "SET_LOADING",
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        default:
            throw Error(`An unknown Action to Filter Reducer ${action.type}`);
    }

    return state;
};

const FilterProvider = ({children}) => {
    let {state: menus} = useMenus();
    let [state, dispatch] = useReducer(reducer, initializeState, (init) => {
        let FilterMenu = menus['data'].find(menuItem => menuItem['slug'] === "FilterMenu");

        return {
            ...init,
            filterMenu : FilterMenu,
        }
    });

    return (
        <FilterContext.Provider value={{state, dispatch}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter = () => {
    let context = useContext(FilterContext);
    if(!context) {
        throw Error("useSlider should be use inside FilterProvider");
    }
    let {state, dispatch} = context;

    return {
        state,
        dispatch,
    }
}


export {FilterProvider, useFilter};
