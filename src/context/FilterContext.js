import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useMenus} from "./MenusContext";
import {fetchData} from "../utils/functions";

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
    selectedTab: 0,
}

export const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_FILTER_OPTIONS": "SET_FILTER_OPTIONS",
    "SET_SELECTED_TAB": "SET_SELECTED_TAB",
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        case types.SET_SELECTED_TAB:
            state = {...state, selectedTab: action.selectedTab};
            break;
        case types.SET_FILTER_OPTIONS:
            state = {...state};
            state['filters'][action.filterId].options = action.options;
            state.done = action.done !== undefined ? action.done : state['done'];
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
        let genre = null
        let done = true;
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
                if(filterMenu['slug'] === "genre") {
                    genre = filterMenu['menuId'];
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

        if(genre != null) {
            done = false;
        }
        return {
            ...init,
            filters,
            done,
            genre,
            selectedTab: filters['filtersId'][0],
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

    useEffect(() => {
        if(state['genre'] != null) {
            fetchData(state['genre'], "SearchDependency", (result) => {
                let options = result.map(option => {
                    return {
                        optionId: option,
                        caption: option,
                        selected: false,
                    }
                });
                dispatch({
                    type: types.SET_FILTER_OPTIONS,
                    options: options,
                    filterId: state['genre'],
                    done: true,
                })
            }, () => {}, () => {});
        }
    }, [state['genre']])

    return {
        state,
        dispatch,
    }
}


export {FilterProvider, useFilter};
