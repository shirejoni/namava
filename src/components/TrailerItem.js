import React from "react";
import {getNamavaUrl} from "../utils/functions";
import './TrailerItem.scss';
const TrailerItem = ({item, placeholder = false}) => {
    return (
        <div className="trailer-item">
            <a href={getNamavaUrl(item['fullImageUrl'])} data-attribute="SRL" className="trailer-image">
                {placeholder === false && (
                    <img src={getNamavaUrl(item['imageUrl'])} />
                )}
            </a>
        </div>
    )
}

export default TrailerItem;
