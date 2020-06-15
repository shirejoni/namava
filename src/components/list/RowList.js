import React, {createRef, useEffect, useReducer} from "react";
import {Link} from "react-router-dom";
import './RowList.scss';
import Flickity from 'flickity';
import {fetchData} from "../../utils/functions";
import {RealLazyLoad} from 'real-react-lazyload';

const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERROR": "SET_ERROR",
    "SET_FETCH_REQUEST": "SET_FETCH_REQUEST",
}

let rowListReducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = {...state, loading: action.loading};
            break;
        case types.SET_ITEMS:
            state = {...state, error: false, items: action.items};
            break;
        case types.SET_ERROR:
            state = {...state, items: [], error: action.error};
            break;
        case types.SET_FETCH_REQUEST:
            state = {...state, fetchRequest: true};
            break;
        default:
            throw Error(`An unknown Action to RowList Reducer ${action.type}`)
    }
    return state;
}

let initialState = {
    items: [],
    loading: false,
    error: false,
    fetchRequest: false,
}
const RowList = React.forwardRef(({className, data: {payloadType, payloadKey, title}, ItemComponent, placeholder = false}, ref) => {
    let flickityRef = createRef();
    let [state, dispatch] = useReducer(rowListReducer, initialState, (initState) => initState);
    let {items, loading, error, fetchRequest} = state;
    useEffect(() => {
        if(fetchRequest && (items.length === 0 && loading === false && error === false)) {
            fetchData(payloadKey, payloadType, (result) => {
                dispatch({type: types.SET_ITEMS, items: result});
            }, (error) => {
                dispatch({type: types.SET_ERROR, error});
            }, (isLoading) => {
                dispatch({type: types.SET_LOADING, loading: isLoading});

            });
        }
    }, [payloadKey, payloadType, placeholder, fetchRequest, dispatch, items.length, loading, error]);

    useEffect(() => {
        let flickityHandler = undefined;
        if(flickityRef.current && flickityRef.current.querySelector('.row')) {
            flickityHandler = new Flickity(flickityRef.current.querySelector('.row'), {
                contain: true,
                pageDots: false,
                prevNextButtons: false,
                cellAlign: 'right',
                rightToLeft: true,
                groupCells: true
            });
        }
        return () => {
            if(flickityHandler) {
                flickityHandler.remove();
            }
        }
    }, [flickityRef, items.length]);

    const getItems = () => {
        let content = [];
        if(placeholder || (placeholder === false && items.length === 0)) {
            let count = 8;
            if(typeof placeholder === 'number') {
                count = placeholder;
            }
            for(let i = 0; i < count; i++) {
                content.push(<ItemComponent key={`row-item-${payloadType}-${payloadKey}-${i}`} placeholder={true}/>)
            }
        }else {
            content = items.map(item => (<ItemComponent key={`row-item-${payloadType}-${payloadKey}-${item['id']}`} item={item}/>))
        }
        return content;
    }

    if(placeholder) {
        return (
            <div ref={ref} className="row">
                {getItems()}
            </div>
        )
    }
    let canIRender = items.length > 0 && error === false && loading === false;
    return (
        <div ref={ref} className={`row-list col-12 p-0 ${className}`}>
            <div className="row-title">
                <h3>{title}</h3>
                <Link to={"#"} className="more-link">
                    <span>مشاهده همه</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="10 0 20 40"
                         className="t-icon-0-1-107">
                        <path className="svg-c1"
                              d="M14.77 18.793c0-.493.196-.967.545-1.315l6.2-6.2a1.86 1.86 0 0 1 2.626 2.633l-4.88 4.882 4.88 4.88a1.86 1.86 0 0 1-2.63 2.63l-6.2-6.2c-.347-.348-.54-.82-.54-1.31z"
                              style={{transform: "translateY(2px)"}}></path>
                    </svg>
                </Link>
            </div>
            <div className="list-container" ref={flickityRef}>
                <RealLazyLoad forceVisible={canIRender} placeholder={
                    <RowList placeholder={true} data={{payloadKey, payloadType}} ItemComponent={ItemComponent}/>
                } componentEntryCallback={() => {
                    if(fetchRequest === false) {
                        dispatch({type: types.SET_FETCH_REQUEST});
                    }
                    return false;
                }}>
                    <div className="row">
                        {(items.length > 0 && loading === false) && (getItems())}
                    </div>
                </RealLazyLoad>
            </div>
        </div>
    )
});

export default RowList;
