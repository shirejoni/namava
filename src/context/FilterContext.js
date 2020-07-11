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

        let filters = {
            filtersId: [],
        }

        if(FilterMenu) {
            let filtersMenu = menus['data'].filter(menuItem => menuItem['parentId'] === FilterMenu['menuId']);
            filtersMenu.forEach(filterMenu => {
                filters.filtersId.push(filterMenu['menuId']);
                filters[filterMenu['menuId']] = {
                    filterId: filterMenu['menuId'],
                    slug: filterMenu['slug'],
                    options: [],
                    caption: filterMenu['caption'],
                    selected: [],
                }
            });
            menus['data'].forEach(menuItem => {
                let filterId = filters['filtersId'].find(fId => fId == menuItem['parentId']);
                if(filterId != null) {
                    filters[filterId].options.push({
                        optionId: menuItem['menuId'],
                        slug: menuItem['slug'],
                        caption: menuItem['caption'],
                        entityType: menuItem['entityType'],
                        selected: false,
                    });
                }
            });

        }
        return {
            ...init,
            filters,
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
