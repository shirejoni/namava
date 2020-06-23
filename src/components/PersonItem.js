import React from "react";
import {getNamavaUrl} from "../utils/functions";
import Config from '../config';
import './PersonItem.scss';
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
        <a href="#">
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
        </a>
    </div>
}

export default PersonItem;
