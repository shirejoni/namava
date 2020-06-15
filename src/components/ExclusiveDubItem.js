import React from "react";
import './ExclusiveDubItem.scss';
import {getNamavaUrl} from "../utils/functions";
import {ImageRealLazyLoad} from 'real-react-lazyload';

const getCaption = (info) => {
    let caption = info['caption'] || info['seriesCaption'];
    if(info['episodCaption']) {
        let parts = info['episodCaption'].split('-');
        caption = <React.Fragment>
            <div className="serious-title">{parts[0]}</div>
            <div className="episode-title">{parts[1]}</div>
        </React.Fragment>
    }
    return caption;
}

const ExclusiveDubItem = ({item, placeholder = false}) => {
    return (
        <div className="exclusive-dub-item">
            <div className="item-image">
                {placeholder === false && (
                    <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'] || item['seriesImageUrl'])}
                                       alt={item['caption']}/>
                )}
            </div>
            <div className="item-title">
                {placeholder === false && getCaption(item)}
            </div>
        </div>
    )
}

export default ExclusiveDubItem;
