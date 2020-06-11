import React, {createRef, useEffect} from "react";
import {Link} from "react-router-dom";
import './RowList.scss';
import MovieItem from "../MovieItem";
import Flickity from 'flickity';
const RowList = () => {
    let flickityRef = createRef();

    useEffect(() => {
        let flickityHandler = undefined;
        if(flickityRef.current && flickityRef.current.querySelector('.row')) {
            flickityHandler = new Flickity(flickityRef.current.querySelector('.row'), {
                contain: true,
                pageDots: false,
                prevNextButtons: false,
                cellAlign: 'right',
                rightToLeft: true,
                groupCells: true
            });
        }
        return () => {
            if(flickityHandler) {
                flickityHandler.remove();
            }
        }
    })
    return (
        <div className="row-list col-12 p-0">
            <div className="row-title">
                <h3>ویژه</h3>
                <Link to={"#"} className="more-link">
                    <span>مشاهده همه</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="10 0 20 40"
                         className="t-icon-0-1-107">
                        <path className="svg-c1"
                              d="M14.77 18.793c0-.493.196-.967.545-1.315l6.2-6.2a1.86 1.86 0 0 1 2.626 2.633l-4.88 4.882 4.88 4.88a1.86 1.86 0 0 1-2.63 2.63l-6.2-6.2c-.347-.348-.54-.82-.54-1.31z"
                              style={{transform: "translateY(2px)"}}></path>
                    </svg>
                </Link>
            </div>
            <div className="list-container" ref={flickityRef}>
                <div className="row">
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                </div>
            </div>
        </div>
    )
}

export default RowList;
