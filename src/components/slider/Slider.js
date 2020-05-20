import React, {useEffect} from "react";
import './Slider.scss';
import axios from 'axios';
import SliderItem from "./SliderItem";
import {types, useSlider} from "../../context/SliderContext";
const fetchSlider = async (dispatch, sliderID) => {
    dispatch({type: types.SET_LOADING});
    let {data: {succeeded, result, errors}} = await axios.get(`http://localhost:8080/api/v1.0/medias/sliders/${sliderID}`);
    dispatch({
        type: types.SET_ITEMS,
        items: result,
        id: sliderID,
    });
}

const Slider = ({sliderID}) => {

    let {state, dispatch} = useSlider();
    console.log(state);
    useEffect(() => {
        fetchSlider(dispatch,sliderID);
    }, [dispatch]);


    return (
        <div className="col-12 p-0 slider">
            <SliderItem/>
        </div>
    );
}


export default Slider;
