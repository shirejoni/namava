import React from "react";
import {SliderProvider} from "../context/SliderContext";
import {MenusProvider} from "../context/MenusContext";

const Provider = ({children}) => {
    return (
        <MenusProvider>
            <SliderProvider>
                {children}
            </SliderProvider>
        </MenusProvider>
    )
}
export default Provider;
