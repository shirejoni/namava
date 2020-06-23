import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {fetchData, getMediaDetailText} from "../utils/functions";
import MovieDetail from "../components/movie/MovieDetail";
import TrailerList from "../components/list/TrailerList";
import './Single.scss';
import Config from "../config";
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
                <div className="row p-0">
                    <MovieDetail data={state['data']} topMedia={true}/>
                </div>
                {state['data']['slideImageList'] && (
                    <div className="row px-5">
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
            </React.Fragment>
        )}
    </div>
}

export default Single;
