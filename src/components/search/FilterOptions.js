import React from "react";
import './FilterOptions.scss';
import OptionItem from "./OptionItem";
import RangeSlider from "../RangeSlider";

let domain = [1900, 2020];
const FilterOptions = ({dispatch, filter}) => {

    let options = [];
    let optionIndex = 0;
    let optionItems = [];
    for(let i =0; i < filter.options.length; i++) {
        optionItems.push(
            <OptionItem option={filter['options'][i]} type={filter['type']}
                        key={`filter-option-item-${filter['filterId']}-${filter['options'][i]['optionId']}`}/>
        );
        if(optionItems.length === 5 || i + 1 === filter.options.length) {
            options.push(<div className="options" key={`options-${filter['filterId']}-${optionIndex++}`}>
                {optionItems}
            </div>);
            optionItems = [];
        }
    }

    return <div className="options-container">
        {filter['type'] === 'range-slider' ? (() => {

            return <RangeSlider domain={domain} onChange={() => {
            }} />
        })()  : options}
    </div>
}

export default FilterOptions;
