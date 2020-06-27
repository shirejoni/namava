import React, {useEffect, useState} from "react";
import './Seasons.scss';

const Seasons = ({seasons}) => {
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

    return <div className="seasons">
        <div className="season-select-container">
            <div className="seasons-select">
                <div className="season-selector-button" onClick={() => {
                    if(state['active'] === false) {
                        setState(state => ({...state, active: true}));
                    }
                }}>
                    فصل 10
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
                            <li key={`seasons-list-item-${season['seasonId']}`}>{season['seasonName'].split('-')[1].trim()}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
}

export default Seasons;
