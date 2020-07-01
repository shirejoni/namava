import React from "react";
import {useLocation} from 'react-router-dom';
const List = () => {
    let location = useLocation();
    console.log("List", location);
    return <div className="list container-fluid">
        <div className="row p-0">
            List
        </div>
    </div>
}

export default List;
