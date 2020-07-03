import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {fetchData, getMediaDetailText} from "../utils/functions";
import MovieDetail from "../components/movie/MovieDetail";
import TrailerList from "../components/list/TrailerList";
import './Single.scss';
import Config from "../config";
import PersonItem from "../components/PersonItem";
import MultiLineList from "../components/list/MultiLineList";
import MovieItem from "../components/MovieItem";
import Comments from "../components/movie/Comments";
import Seasons from "../components/movie/Seasons";
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
        {(state['loading'] === false && state['data'] != null && state['id'] === id) && (
            <React.Fragment>
                <div className="row p-0">
                    <MovieDetail data={state['data']} topMedia={true}/>
                </div>
                {state['data']['seasons'] && (
                    <div className="row">
                        <div className="col-12 px-5 negative-margin">
                            <Seasons seasons={state['data']['seasons']}/>
                        </div>
                    </div>
                )}
                {(state['data']['slideImageList'] && state['data']['slideImageList'].length > 0) && (
                    <div className={`row px-5 ${state['data']['seasons'] ? '' : 'negative-margin'}`}>
                        <div className="col-12">
                            <TrailerList id={id} images={state['data']['slideImageList']}/>

                        </div>
                    </div>
                )}
                <div className="row single-row">
                    <div className="col-12 px-5">
                        {state['data']['movieLatinName'] && (
                            <div className="media-detail-latin-name">
                                {state['data']['movieLatinName']}
                            </div>
                        )}
                        {state['data']['caption'] && (
                            <div className="media-detail-title">
                                درباره {(() => {
                                    return state['data']['type'].toLowerCase() === Config.itemTypes.Series ?  'سریال ' : 'فیلم '
                            })()}
                                 {state['data']['caption']}
                            </div>
                        )}
                        {state['data']['about'] && (
                            <div className="media-detail-description" dangerouslySetInnerHTML={{__html: state['data']['about']}}></div>
                        )}
                        {state['data']['categories'] && (
                            getMediaDetailText('دسته بندی', state['data']['categories'], 10, 'category', ' ، ')
                        )}
                        {state['data']['voiceList'] && (
                            getMediaDetailText('صدا', state['data']['voiceList'], 10, 'language', ' ، ')
                        )}
                        {state['data']['subtitleList'] && (
                            getMediaDetailText('زیرنویس', state['data']['subtitleList'], 10, 'language', ' ، ')
                        )}
                    </div>
                </div>
                <div className="row">
                    {(state['data']['casts'] && state['data']['casts'].length > 0) && (
                        <MultiLineList data={{
                            payloadType: "PersonList",
                            payloadKey: id,
                            items: state['data']['casts'],
                            key: 'castId',
                            slug: 'castRole'
                        }} preview={false} ItemComponent={PersonItem} placeholder={false}/>
                    )}
                </div>
                <div className="row">
                    <MultiLineList data={{
                        payloadType: "SinglePageRelated",
                        payloadKey: id,
                        options: {
                            categoryId: (state['data']['categories'] && state['data']['categories'].length > 0) ? state['data']['categories'][0]['categoryId'] : undefined,
                        },
                        maxItems: 14
                    }} preview={true} firstRequest={true} ItemComponent={MovieItem} />
                </div>
                <Comments mediaId={id}/>
            </React.Fragment>
        )}
    </div>
}

export default Single;
