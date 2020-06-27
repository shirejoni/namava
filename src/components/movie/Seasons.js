import React, {useEffect, useState} from "react";
import './Seasons.scss';
import {fetchData} from "../../utils/functions";
import MultiLineList from "../list/MultiLineList";
import EpisodeItem from "../EpisodeItem";

const Seasons = ({seasons}) => {
    let [state, setState] = useState({
        season: seasons[0],
        episodes: {},
        error: false,
        loading: false
    });

    const changeSeasonHandler = (season) => {
        setState({...state, season});
    }
    let seasonId = state['season'] ? state['season']['seasonId'] : 0;
    useEffect(() => {
        if(state['loading'] === false && state['error'] === false && state['episodes'][seasonId] === undefined) {
            fetchData(seasonId, "SinglePageSeasons", (result) => {
                setState(state => ({...state, episodes: {...state['episodes'], [seasonId]: result}, error: false, loading: false}));
            }, () => {}, (isLoading) => {
                if(isLoading){
                    setState(state => ({...state, loading: true}));
                }
            });
        }
    }, [seasonId])

    console.log("Seasons", state);
    return  <div className="seasons">
        <div className="season-select-container">
            <SeasonSelector seasons={seasons} season={state['season']} onSelect={changeSeasonHandler}/>
        </div>
        {(state['loading'] === false && state['episodes'][seasonId]) && (
            <div className="row">
                <MultiLineList className={'seasons-list'} data={{
                    payloadType: "SinglePageSeasons",
                    payloadKey: seasonId,
                    items: state['episodes'][seasonId],
                    perRow: 4
                }} ItemComponent={EpisodeItem} placeholder={false}/>
            </div>
        )}
    </div>
}


function getSeasonName(season) {
    return season['seasonName'].split('-')[1].trim();
}

const SeasonSelector = ({seasons, season: selectedSeason, onSelect}) => {
    let [state, setState] = useState({
        active: false,
    })

    const seasonsListHandler = () => {
        if(state['active'] === true) {
            setState(state => ({...state, active: false}));
        }
    }

    useEffect(() => {
        if(state['active'] === true) {
            document.addEventListener('click', seasonsListHandler);
        }
        return () => {
            document.removeEventListener('click', seasonsListHandler);
        }
    }, [state['active']])

    return <div className="seasons-select">
                <div className="season-selector-button" onClick={() => {
                    if(state['active'] === false) {
                        setState(state => ({...state, active: true}));
                    }
                }}>
                    {getSeasonName(selectedSeason)}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.393" height="7.627" viewBox="0 0 12.393 7.627"
                         className="t-icon-0-1-274">
                        <g id="chevron_down" transform="translate(-490.31 -743.147)">
                            <path className="svg-c1"
                                  d="M496.507,750.774a1.426,1.426,0,0,1-1.012-.419l-4.766-4.766a1.43,1.43,0,1,1,2.023-2.023l3.754,3.754,3.754-3.754a1.431,1.431,0,0,1,2.023,2.023l-4.766,4.766A1.426,1.426,0,0,1,496.507,750.774Z"></path>
                        </g>
                    </svg>
                </div>
                {state['active'] === true && (
                    <ul className="seasons-list">
                        {seasons.map(season => (
                            <li key={`seasons-list-item-${season['seasonId']}`} onClick={() => {
                                if(season['seasonId'] !== selectedSeason['seasonId']) {
                                    onSelect(season);
                                }
                            }}>{getSeasonName(season)}</li>
                        ))}
                    </ul>
                )}
            </div>
}

export default Seasons;
