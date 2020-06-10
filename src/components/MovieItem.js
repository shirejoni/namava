import React from "react";
import './MovieItem.scss';

const MovieItem = () => {
    return (
        <div className="movie-item">
            <div className="item-image">
                <img src="https://namava.ir/Content/Upload/Images/ddcbbcb1-bc4c-4c9d-a0d3-ef9c5b1b1e2d.jpg"
                     alt="movie"/>
            </div>
            <div className="item-title">
                روزی زیبا در محله
            </div>
        </div>
    )
}

export default MovieItem;
