import React, {useEffect} from "react";
import './Slider.scss';
import namava from '../../utils/namava';
import SliderItem from "./SliderItem";
import {types, useSlider} from "../../context/SliderContext";
import Config from "../../config";
const fetchSlider = async (dispatch, sliderID) => {
    dispatch({type: types.SET_LOADING});
    let url = (Config.sliders.url).replace('{{SLIDER_ID}}', sliderID);
    let {data: {succeeded, result, errors}} = await namava.get(url);
    if(succeeded) {
        dispatch({
            type: types.SET_ITEMS,
            items: result,
            id: sliderID,
        });
    }else {
        dispatch({
            type: types.SET_ERRORS,
            errors,
        });
    }
}

const Slider = ({sliderID}) => {

    let {state, dispatch, nextSlide} = useSlider();
    useEffect(() => {
        fetchSlider(dispatch,sliderID);
    }, [dispatch, sliderID]);

    useEffect(() => {
        let slideTimeOutHandler = undefined;
        slideTimeOutHandler = setTimeout(() => {
            nextSlide();
        }, 3000);
        return () => {
            clearTimeout(slideTimeOutHandler);
        }
    })

    return (
        <div className="col-12 p-0 slider">
            {(state.succeeded && state.items.length > 0) && state.items.map((sliderItem, index) => (
                <SliderItem key={sliderItem['id']} className={state.currentSlide == index ? 'active' : (state.previousSlide == index ? 'previous' : '')} slider={sliderItem}/>
            ))}
        </div>
    );
}


export default Slider;
