import React from "react";
import {useParams} from 'react-router-dom';

const Single = () => {
    let {type, id, name} = useParams();

    console.log("Single Page", type, id, name);
    return <div className="container-fluid single">
        Single Page
    </div>
}

export default Single;
