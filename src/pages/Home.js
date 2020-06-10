import React from "react";
import Slider from "../components/slider/Slider";
import MovieItem from "../components/MovieItem";


const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Slider sliderID={1316}/>
                <MovieItem/>
            </div>
        </div>
    )

}

export default Home;
