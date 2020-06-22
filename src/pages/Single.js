import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {fetchData} from "../utils/functions";

const Single = () => {
    let {type, id, name} = useParams();
    let [state, setState] = useState({
        id: undefined,
        data: null,
        error: false,
        loading: false,
    });

    useEffect(() => {
        if(state['loading'] === false && state['error'] === false && (state['data'] == null || state['id'] != id)) {
            let payloadType = type === 'series' ? "SinglePageSeries" : "SinglePageMovie";
            fetchData(id, payloadType, (result) => {
                setState({...state, id: id, data: result, error: false, loading: false});
            }, () => {}, (isLoading) => {
                if(isLoading) {
                    setState({...state, loading: true});
                }
            });
        }
    },[state,id]);

    console.log("Single Page", type, id, name, state);
    return <div className="container-fluid single">
        {(state['loading'] === false && state['data'] != null) && (
            <React.Fragment>
                Hello
            </React.Fragment>
        )}
    </div>
}

export default Single;
