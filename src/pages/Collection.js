import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import styled, {css} from "styled-components";
import {fetchData, getNamavaUrl} from "../utils/functions";
import './Collection.scss';
import List from "./List";
import Config from "../config";

const CollectionDetail = styled.div`
    width: 100%;
    hegith: 100%;
    ${props => {
    return css`
            min-height: 46.875vw;
            box-shadow: 0 -5px 5px inset rgb(18,18,18);
            background-size: contain;
            background-image: linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), 
            url(${props['imageUrl']});
        `;
}}
`;


const Collection = () => {
    let {id} = useParams();
    let [state, setState] = useState({
        id: undefined,
        data: null,
        loading: false,
        error: false,
    });

    useEffect(() => {
        if(state['loading'] === false && state['error'] === false && (state['data'] == null | state['id'] != id)) {
            fetchData(id, "Collection", (result) => {
                setState({...state, id: id, data: result, loading: false, error: false});
            }, () => {}, (isLoading) => {
                if(isLoading) {
                    setState({...state, loading: true});
                }
            })
        }
    }, [id, state]);

    let imageUrl;
    if(state['data'] && state['data']['coverLandscape'] !== undefined) {
        imageUrl = getNamavaUrl(state['data']['coverLandscape']);
    }

    return (
        <div className="collection container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    {state['loading'] !== true && state['data'] && (
                        <CollectionDetail imageUrl={imageUrl} className={"collection-detail"}>
                            <div className="collection-detail-box">
                                {state['data']['caption'] && (
                                    <h1 className={"title"}>{state['data']['caption']}</h1>
                                )}
                                {state['data']['shortDescription'] && (
                                    <div className="detail-description" dangerouslySetInnerHTML={{__html: state['data']['shortDescription']}}></div>
                                )}
                            </div>
                        </CollectionDetail>
                    )}
                </div>
            </div>
            <div className="row">
                <List data={{payloadType: Config.pageItemsType.PostGroup, payloadKey: id }} showMore={true} firstRequest={true}/>
            </div>
        </div>
    )
}

export default Collection;
