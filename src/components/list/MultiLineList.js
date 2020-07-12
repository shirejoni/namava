import React, { useEffect, useReducer} from "react";
import {fetchData} from "../../utils/functions";
import './MultiLineList.scss';
import {RealLazyLoad} from 'real-react-lazyload';
import SingleRowList from "./SingleRowList";
import Config from "../../config";
const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERROR": "SET_ERROR",
    "SET_FETCH_REQUEST": "SET_FETCH_REQUEST",
    "SET_ITEMS_AND_ITEMS_PROPS": "SET_ITEMS_AND_ITEMS_PROPS",
}

let multiLinListReducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: true};
            break;
        case types.SET_ITEMS:
            state = {...state,
                error: false,
                items: action.items,
                loading: false,
                pi: action.pi !== undefined ? action.pi : state['pi'],
                page: action.page !== undefined ? action.page : state['page'],
                showMore: action.showMore !== undefined ? action.showMore : state['showMore'],
                fetchRequest: action.fetchRequest !== undefined ? action.fetchRequest : state['fetchRequest'],
            };
            break;
        case types.SET_ITEMS_AND_ITEMS_PROPS:
            state = {...state, error: false, items: action.items, loading: false, itemsProps: action.itemsProps};
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


const MultiLineList = React.forwardRef(({className, data: {payloadType, payloadKey, title, items: defaultItems, showMore = false, pi, page, key = "id", slug, maxItems, options = {}, perRow = 7}, firstRequest = false, ItemComponent, placeholder = false, preview = false}, ref) => {
    let initialState = {
        items: defaultItems || [],
        loading: false,
        error: false,
        showMore: showMore,
        fetchRequest: firstRequest,
        pi: pi,
        page: page,
        itemsProps: defaultItems ? payloadKey : false,
    }
    let [state, dispatch] = useReducer(multiLinListReducer, initialState, (initState) => initState);
    let {items, loading, error, fetchRequest} = state;
    useEffect(() => {
        if((fetchRequest) && (items.length === 0 && loading === false && error === false)) {
            fetchNextData(state['pi'] !== undefined ? state['pi'] + 1: undefined, state['page'] !== undefined ? state['page'] + 1: undefined);
        }else if(state['itemsProps'] !== false && state['itemsProps'] !== payloadKey) {
            dispatch({type: types.SET_ITEMS_AND_ITEMS_PROPS, items: defaultItems, itemsProps: payloadKey});

        }
    }, [payloadKey, payloadType, placeholder, fetchRequest, dispatch, items.length, loading, error]);

    const fetchNextData = (pi = undefined, page = undefined) => {
        let fetchDataOptions = {...options, pi};
        if(page !== undefined) {
            fetchDataOptions['page'] = page;
        }
        let ps = 10;
        let section = Config.sections[payloadType];
        if(section && (section['ps'] !== undefined || section['count'] !== undefined)) {
            ps = section['ps'] || section['count'];
        }
        fetchData(payloadKey, payloadType, (result) => {
            let resultItems;
            if(state['page'] !== undefined) {
                resultItems = result['result_items'][0]['items'];
            }else {
                resultItems = result;
            }
            dispatch({
                type: types.SET_ITEMS,
                items: [...state['items'], ...resultItems],
                pi: pi,
                page: page,
                showMore: (resultItems && resultItems.length) >= ps ? state['showMore'] : false,
                fetchRequest: (resultItems && resultItems.length) >= ps ? state['fetchRequest'] : false,
            });
        }, (error) => {
            dispatch({type: types.SET_ERROR, error});
        }, (isLoading) => {
            if(isLoading) {
                dispatch({type: types.SET_LOADING, loading: isLoading});
            }
        }, fetchDataOptions);
    }

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
            if(z === perRow || i + 1 === max) {
                rows.push(<SingleRowList showMoreCallback={() => {
                    if(state['showMore'] === true) {
                        fetchNextData(state['pi'] !== undefined ? state['pi'] + 1: undefined, state['page'] !== undefined ? state['page'] + 1: undefined);
                    }
                }} showMore={i + 1 === max ? state['showMore'] : false} row={row++} key={`single-row-${payloadType}-${payloadKey}-${key}-${row}`} data={{
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

    let canIRender = items.length > 0 && error === false;
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
