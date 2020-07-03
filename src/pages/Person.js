import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {fetchData, getNamavaUrl} from "../utils/functions";
import './Person.scss';
import MultiLineList from "../components/list/MultiLineList";
import MovieItem from "../components/MovieItem";



const Person = () => {
    let {id} = useParams();
    let [state, setState] = useState({
        id: undefined,
        data: null,
        loading: false,
        error: false,
    });

    useEffect(() => {
        if(state['loading'] === false && state['error'] === false && (state['data'] == null | state['id'] != id)) {
            fetchData(id, "Person", (result) => {
                setState({...state, id: id, data: result, loading: false, error: false});
            }, () => {}, (isLoading) => {
                if(isLoading) {
                    setState({...state, loading: true});
                }
            })
        }
    }, [id, state]);


    return (
        <div className="person-list container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    {state['loading'] !== true && state['data'] && (
                            <React.Fragment>
                                <div className="col-12 person-detail-container">
                                    <img className="person-detail-image" src={getNamavaUrl(state['data']['imageUrl'])} alt={state['data']['castName']}/>
                                    <div className="person-info">
                                        <div className="person-title">
                                            {state['data']['castName']}
                                        </div>
                                        <div className="person-description" dangerouslySetInnerHTML={{__html: state['data']['fullDescription']}}></div>
                                    </div>
                                </div>
                            </React.Fragment>

                    )}
                </div>
            </div>
            {(state['data'] != null && state['loading'] === false) && (
                <div className="row">
                    <MultiLineList data={{
                        payloadType: "PersonMovie",
                        payloadKey: id,
                        items: state['data']['medias'],
                        key: "mediaId",
                    }} showMore={false} preview={true} ItemComponent={MovieItem}/>
                </div>
            )}
        </div>
    )
}

export default Person;
