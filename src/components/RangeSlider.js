import React, {useEffect, useState} from "react";
import {Slider, Rail, Handles, Tracks} from 'react-compound-slider';
import './RangeSlider.scss';

const RangeSlider = ({onChange, domain, min, max}) => {
    let [state, setState] = useState({
        min,
        max
    })

    useEffect(() => {
        if(min !== state['min'] || max !== state['max']) {
            setState({
                min,
                max
            });
        }
    }, [min, max]);
    return (
        <div className="range-slider">
            <Slider
                domain={domain}
                values={[state['min'], state['max']]}
                onUpdate={([min, max]) => {
                    setState({min: Math.floor(min), max: Math.floor(max)});
                }}
                onChange={onChange}
            >
                <Rail>
                    {({ getRailProps }) => (
                        <div className="range-slider-rail" {...getRailProps()}></div>
                    )}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map(handle => (
                                <div key={`slider-range-${handle['id']}-${handle['percent']}`} style={{left: handle['percent'] + "%"}} className="slider-handle" {...getHandleProps(handle['id'])}></div>
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks left={false} right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                            {tracks.map(({ id, source, target }) => (
                                <div className="track" key={`track-width-${id}`} style={{
                                    left: `${source.percent}%`,
                                    width: `${target.percent - source.percent}%`,
                                }} {...getTrackProps()}></div>
                            ))}
                        </div>
                    )}
                </Tracks>

            </Slider>
            <div className="date-slider">
                <div className="date-from">
                    از {state['min']}
                </div>
                <div className="date-until">
                    تا {state['max']}
                </div>
            </div>
        </div>
    )
}

export default RangeSlider;
