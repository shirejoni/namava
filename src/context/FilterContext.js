import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useMenus} from "./MenusContext";
import {fetchData} from "../utils/functions";
import {useLocation} from 'react-router-dom';
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
    queryString: "",
    selectedTab: 0,
}

export const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_FILTER_OPTIONS": "SET_FILTER_OPTIONS",
    "SET_SELECTED_TAB": "SET_SELECTED_TAB",
    "SELECT_OPTION": "SELECT_OPTION",
    "DESELECT_OPTION": "DESELECT_OPTION",
    "TOGGLE_FILTER_BOX": "TOGGLE_FILTER_BOX",
    "CLEAR_ALL": "CLEAR_ALL",
}

const getQueryString = (state) => {
    let params = {};
    state['filters']['filtersId'].forEach(filterId => {
        let param = [];
        state['filters'][filterId].selected.forEach(optionSelect => {
            if(optionSelect['default'] !== true) {
                param.push(optionSelect['optionId']);
            }
        });
        if(param.length > 0) {
            params[state['filters'][filterId]['slug']] = param;
        }
    });

    return Object.keys(params).map(key => key + "=" + params[key].join(',')).join('&');
}


const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        case types.TOGGLE_FILTER_BOX:
            state = {...state, active: !state['active']};
            break;
        case types.SET_SELECTED_TAB:
            state = {...state, selectedTab: action.selectedTab};
            break;
        case types.SET_FILTER_OPTIONS:
            state = {...state};
            state['filters'][action.filterId].options = action.options;
            state.done = action.done !== undefined ? action.done : state['done'];
            break;
        case types.SELECT_OPTION:
            state = {...state};
            if(action.filterType === "radio") {
                state['filters'][action.filterId].selected = [];
                state['filters'][action.filterId].options =  state['filters'][action.filterId].options.map(option => ({...option, selected : false}));
            }
            if(action.optionIndex !== undefined) {
                state['filters'][action.filterId].options[action.optionIndex].selected = true;
            }
            let index = state['filters'][action.filterId].selected.findIndex(optionSelect => optionSelect['optionId'] === action.optionId);
            if(index === -1) {
                state['filters'][action.filterId].selected.push({
                    optionId: action.optionId,
                    filterId: action.filterId,
                    optionIndex: action.optionIndex,
                    caption: action.optionCaption,
                    default: action.filterType === "radio" && action.optionIndex === 0 ? true : false,
                });
            }
            break;
        case types.CLEAR_ALL:
            state = {...state};
            state['filters']['filtersId'].forEach(filterId => {
                state['filters'][filterId].selected = state['filters'][filterId].selected.filter(optionSelect => {
                    if(optionSelect['optionIndex'] !== undefined) {
                        state['filters'][filterId].options[optionSelect['optionIndex']].selected = false;
                    }
                    return false;
                });
                if(state['filters'][filterId]['type'] === "radio" && state['filters'][filterId].selected.length === 0) {
                    state['filters'][filterId].selected.push({
                        optionId: state['filters'][filterId].options[0].optionId,
                        filterId: state['filters'][filterId].options[0].filterId,
                        optionIndex: 0,
                        caption: state['filters'][filterId].options[0].caption,
                        default: true,
                    });
                    state['filters'][filterId].options[0].selected = true;
                }
            });

            break;
        case types.DESELECT_OPTION:
            state = {...state};
            if(action.optionIndex !== undefined && state['filters'][action.filterId].options[action.optionIndex]) {
                state['filters'][action.filterId].options[action.optionIndex].selected = false;
            }
            state['filters'][action.filterId].selected = state['filters'][action.filterId].selected.filter(optionSelect => optionSelect['optionId'] !== action.optionId);
            if(state['filters'][action.filterId]['type'] === "radio" && state['filters'][action.filterId].selected.length === 0) {
                state['filters'][action.filterId].selected.push({
                    optionId: state['filters'][action.filterId].options[0].optionId,
                    filterId: state['filters'][action.filterId].options[0].filterId,
                    optionIndex: 0,
                    caption: state['filters'][action.filterId].options[0].caption,
                    default: true,
                });
                state['filters'][action.filterId].options[0].selected = true;
            }
            break;
        default:
            throw Error(`An unknown Action to Filter Reducer ${action.type}`);
    }
    state['queryString'] = getQueryString(state);
    return state;
};

const FilterProvider = ({children}) => {
    let {state: menus} = useMenus();
    let locaiton = useLocation();
    let [state, dispatch] = useReducer(reducer, initializeState, (init) => {
        let FilterMenu = menus['data'].find(menuItem => menuItem['slug'] === "FilterMenu");

        let filters = {
            filtersId: [],
        }
        let genre = null
        let sort = null
        let done = true;
        let params = new URLSearchParams(locaiton['search'].substr(1));
        if(FilterMenu) {
            let filtersMenu = menus['data'].filter(menuItem => menuItem['parentId'] === FilterMenu['menuId']);
            filtersMenu.forEach(filterMenu => {
                filters.filtersId.push(filterMenu['menuId']);
                let selected = [];
                let values = params.get(filterMenu['slug']) ? params.get(filterMenu['slug']).split(',') : [];
                if(values.length > 0) {
                    selected = values.map(value => {
                        let select =  {
                            filterId: filterMenu['menuId'],
                            optionId: value,
                        }
                        if(filterMenu['slug'] === "year") {
                            select['caption'] = value;
                        }
                        return select;
                    });
                }
                filters[filterMenu['menuId']] = {
                    filterId: filterMenu['menuId'],
                    slug: filterMenu['slug'],
                    options: [],
                    caption: filterMenu['caption'],
                    selected: selected,
                    type: filterMenu['slug'] === 'sort' ? 'radio' : (filterMenu['slug'] === 'year' ? 'range-slider' : 'checkbox')
                }
                if(filterMenu['slug'] === "genre") {
                    genre = filterMenu['menuId'];
                }
                if(filterMenu['slug'] === "sort") {
                    sort = filterMenu['menuId'];
                }
            });
            menus['data'].forEach(menuItem => {
                let filterId = filters['filtersId'].find(fId => fId == menuItem['parentId']);
                if(filterId != null) {
                    let length = filters[filterId].options.push({
                        optionId: menuItem['menuId'],
                        slug: menuItem['slug'],
                        caption: menuItem['caption'],
                        entityType: menuItem['entityType'],
                        selected: false,
                    });
                    let index = filters[filterId].selected.findIndex(({optionId}) => optionId == menuItem['menuId']);
                    if(index !== -1) {
                        filters[filterId].options[length - 1].selected = true;
                        filters[filterId].selected[index].optionIndex = length -1;
                        filters[filterId].selected[index].caption = menuItem['caption'];
                    }
                }
            });

        }

        if(genre != null) {
            done = false;
        }
        if(sort != null && filters[sort].selected.length === 0) {
            filters[sort].selected.push({
                filterId: sort,
                optionId: filters[sort].options[0].optionId,
                caption: filters[sort].options[0].caption,
                optionIndex: 0,
                default: true,
            });
            filters[sort].options[0].selected = true;
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

const useFilter = (fetchGenre = false) => {
    let context = useContext(FilterContext);
    if(!context) {
        throw Error("useSlider should be use inside FilterProvider");
    }
    let {state, dispatch} = context;

    useEffect(() => {
        if(state['genre'] != null && fetchGenre === true) {
            fetchData(state['genre'], "SearchDependency", (result) => {
                let i = 0;
                let options = result.map(option => {
                    let index = state['filters'][state['genre']].selected.findIndex(({optionId}) => optionId == option);
                    if(index !== -1) {
                        state['filters'][state['genre']].selected[index].optionIndex = i;
                        state['filters'][state['genre']].selected[index].caption = option;
                    }
                    return {
                        optionId: option,
                        caption: option,
                        selected: index !== -1 ? true : false,
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
