import React from "react";
import Slider from "../components/slider/Slider";
import MovieItem from "../components/MovieItem";
import RowList from "../components/list/RowList";


const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Slider sliderID={1316}/>
                <RowList/>
            </div>
        </div>
    )

}

export default Home;
