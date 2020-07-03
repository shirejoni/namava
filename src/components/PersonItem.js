import React from "react";
import {getItemUrl, getNamavaUrl} from "../utils/functions";
import Config from '../config';
import './PersonItem.scss';
import {Link} from "react-router-dom";
const getRoleName = (role) => {
    switch (role) {
        case "Actor":
            return 'بازیگر';
        case "Author":
            return "نویسنده";
        case "Director":
            return "کارگردان";
        default:
            return role;
    }
}

const PersonItem = ({item, placeholder = false}) => {

    let imageUrl = item['imageUrl'] || item['castImageUrl'];
    if(imageUrl) {
        imageUrl = getNamavaUrl(imageUrl);
    }else {
        imageUrl = Config.defaultImage;
    }
    return <div className="person-item">
        <Link to={placeholder === false ? getItemUrl(item, "Person") : "#"}>
            <div className="person-image">
                {placeholder === false && (
                    <img src={imageUrl} alt={item['castName']}/>
                )}
            </div>
            <div className="person-title">
                {item['castName']}
            </div>
            <div className="person-role">
                {getRoleName(item['castRole'])}
            </div>
        </Link>
    </div>
}

export default PersonItem;
