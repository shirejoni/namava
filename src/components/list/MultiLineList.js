import React, { useEffect, useReducer} from "react";
import {fetchData} from "../../utils/functions";
import './MultiLineList.scss';
import SingleRowList from "./SingleRowList";
const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERROR": "SET_ERROR",
    "SET_FETCH_REQUEST": "SET_FETCH_REQUEST",
}

let multiLinListReducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        case types.SET_ITEMS:
            state = {...state, error: false, items: action.items, loading: false};
            break;
        case types.SET_ERROR:
            state = {...state, items: [], error: action.error, loading: false};
            break;
        case types.SET_FETCH_REQUEST:
            state = {...state, fetchRequest: true};
            break;
        default:
            throw Error(`An unknown Action to MultiLineList Reducer ${action.type}`)
    }
    return state;
}


const MultiLineList = React.forwardRef(({className, data: {payloadType, payloadKey, title, items: defaultItems, key, slug, maxItems, options = {}}, ItemComponent, placeholder = false, preview = false}, ref) => {
    let initialState = {
        items: defaultItems || [],
        loading: false,
        error: false,
        fetchRequest: false,
    }
    let [state, dispatch] = useReducer(multiLinListReducer, initialState, (initState) => initState);
    let {items, loading, error, fetchRequest} = state;
    useEffect(() => {
        if((fetchRequest || placeholder === false) && (items.length === 0 && loading === false && error === false)) {
            fetchData(payloadKey, payloadType, (result) => {
                dispatch({type: types.SET_ITEMS, items: result});
            }, (error) => {
                dispatch({type: types.SET_ERROR, error});
            }, (isLoading) => {
                if(isLoading) {
                    dispatch({type: types.SET_LOADING, loading: isLoading});
                }
            }, options);
        }
    }, [payloadKey, payloadType, placeholder, fetchRequest, dispatch, items.length, loading, error]);



    const getRows = () => {
        let rows = [];
        let row = 0;
        let rowItems = [];
        let max = items.length;
        let z = 0;
        if(maxItems != null && maxItems < max) {
            max = maxItems;
        }
        for(let i = 0; i < max; i++) {
            rowItems[z++] = items[i];
            if(z === 7 || i + 1 === max) {
                rows.push(<SingleRowList row={row++} key={`single-row-${payloadType}-${payloadKey}-${key}-${row}`} data={{
                    payloadType,
                    payloadKey,
                    items: rowItems,
                    key,
                    slug
                }} preview={preview} ItemComponent={ItemComponent} placeholder={false}/>)
                z = 0;
                rowItems = [];
            }
        }

        return rows;
    }

    let canIRender = items.length > 0 && error === false && loading === false;
    return (
        <div ref={ref} className={`multi-list col-12 p-0 ${className}`}>
            {title && (
                <div className="multi-title">
                    <h3>{title}</h3>
                </div>
            )}
            {canIRender && (
                getRows()
            )}
        </div>
    )
});

export default MultiLineList;
