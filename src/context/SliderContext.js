import React, {createContext, useContext, useReducer} from "react";

const SliderContext = createContext(null);


const initializeState = {
    id: undefined,
    items: [],
    loading: false,
    errors: [],
    succeeded: false,
    currentSlide: 0,
    previousSlide: null,
}

export const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERRORS": "SET_ERRORS",
    "SET_SLIDE": "SET_SLIDE"
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        case types.SET_ITEMS:
            state = {...state, loading: false, id: action.id, errors: [], succeeded: true, items: action.items};
            break;
        case types.SET_ERRORS:
            state = {...state, loading: false, errors: action.errors, items: [], succeeded: false};
            break;
        case types.SET_SLIDE:
            state = {...state, currentSlide: action.currentSlide, previousSlide: action.previousSlide};
            break;

        default:
            throw Error(`An unknown Action to Slider Reducer ${action.type}`);
    }

    return state;
};

const SliderProvider = ({children}) => {
    let [state, dispatch] = useReducer(reducer, initializeState, () => initializeState);

    return (
        <SliderContext.Provider value={{state, dispatch}}>
            {children}
        </SliderContext.Provider>
    )
}

const useSlider = () => {
    let context = useContext(SliderContext);
    if(!context) {
        throw Error("useSlider should be use inside SliderProvider");
    }
    let {state, dispatch} = context;
    return {
        state,
        dispatch
    }
}


export {SliderProvider, useSlider};
