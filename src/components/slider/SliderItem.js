import React from "react";
import styled from 'styled-components';

const Slide = styled.div`
        background-image: linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), 
        url(${props => props["imageUrl"]});
        min-height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 40px;
    `;

const SliderItem = () => {
    return (
        <div className="slider-container">
            <Slide imageUrl="https://static.namava.ir/Content/Upload/Images/e287044a-1e02-43fa-bddc-23acb573a7d5.jpg">
            </Slide>
        </div>
    )
}

export default SliderItem;
