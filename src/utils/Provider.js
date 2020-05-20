import React from "react";
import {SliderProvider} from "../context/SliderContext";

const Provider = ({children}) => {
    return (
        <SliderProvider>
            {children}
        </SliderProvider>
    )
}
export default Provider;
