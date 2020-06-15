import React from "react";
import './MovieItem.scss';
import {getNamavaUrl} from "../utils/functions";
import {ImageRealLazyLoad} from 'real-react-lazyload';
const MovieItem = ({item, placeholder = false}) => {
    return (
        <div className="movie-item">
            <div className="item-image">
                {placeholder === false && (
                    <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'])}
                                       alt={item['caption']}/>
                )}
            </div>
            <div className="item-title">
                {placeholder === false && item['caption']}
            </div>
        </div>
    )
}

export default MovieItem;
