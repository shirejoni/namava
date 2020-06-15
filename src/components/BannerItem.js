import React from "react";
import {ImageRealLazyLoad} from 'real-react-lazyload';
import {getNamavaUrl} from "../utils/functions";
import './BannerItem.scss'
const BannerItem = ({item, placeholder = false}) => {

    return (
        <div className="banner-item">
            <a href="#" target="_blank">
                <div className="banner-image">
                    {placeholder === false && (
                        <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'])} alt={item['caption']}/>
                    )}
                </div>
                <div className="item-title">
                    {placeholder === false && item['caption']}
                </div>
            </a>
        </div>
    )
}

export default BannerItem;
