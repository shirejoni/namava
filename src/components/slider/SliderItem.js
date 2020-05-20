import React from "react";
import styled from 'styled-components';
import {getNamavaUrl} from "../../utils/functions";

const Slide = styled.div`
        background-image: linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), 
        url(${props => props["imageUrl"]});
        min-height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 40px;
    `;

const SliderItem = ({slider, className}) => {
    return (
        <div className={`slider-container ${className}`}>
            <Slide imageUrl={getNamavaUrl(slider['coverLandscape'])}>
            </Slide>
        </div>
    )
}

export default SliderItem;
