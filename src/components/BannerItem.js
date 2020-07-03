import React from "react";
import {ImageRealLazyLoad} from 'real-react-lazyload';
import {getItemUrl, getNamavaUrl} from "../utils/functions";
import './BannerItem.scss'
import {Link} from "react-router-dom";
const BannerItem = ({item, placeholder = false}) => {

    return (
        <div className="banner-item">
            <Link to={placeholder === false ? getItemUrl(item, "Collection") : "#"}>
                <div className="banner-image">
                    {placeholder === false && (
                        <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'])} alt={item['caption']}/>
                    )}
                </div>
                <div className="item-title">
                    {placeholder === false && item['caption']}
                </div>
            </Link>
        </div>
    )
}

export default BannerItem;
