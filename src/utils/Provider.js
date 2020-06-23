import React from "react";
import {SliderProvider} from "../context/SliderContext";
import {MenusProvider} from "../context/MenusContext";
import SimpleReactLightBox from 'simple-react-lightbox';
const Provider = ({children}) => {
    return (
        <MenusProvider>
            <SimpleReactLightBox>
                <SliderProvider>
                    {children}
                </SliderProvider>
            </SimpleReactLightBox>
        </MenusProvider>
    )
}
export default Provider;
