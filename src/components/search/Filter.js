import React from "react";
import FilterBox from "./FilterBox";
import {types, useFilter} from "../../context/FilterContext";


const Filter = () => {
    let {state, dispatch} = useFilter();
    let filterItems = [];
    state['filters'].filtersId.forEach(filterId => {
        state['filters'][filterId].selected.forEach(optionSelect => {
            if(optionSelect['default'] !== true) {
                filterItems.push(<div key={`filter-item-${optionSelect['optionId']}`} className="filtered-button" onClick={() => {
                    dispatch({
                        type: types.DESELECT_OPTION,
                        optionId: optionSelect['optionId'],
                        filterId: optionSelect['filterId'],
                        optionIndex: optionSelect['optionIndex']
                    });
                }}>
                <span>
                    {optionSelect['caption']}
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path className="svg-c1"
                              d="M16.4 14.85l-4.488-4.488L16.4 5.874a1.1 1.1 0 0 0 0-1.552 1.1 1.1 0 0 0-1.552 0L10.36 8.8 5.873 4.322a1.1 1.1 0 0 0-1.552 0 1.1 1.1 0 0 0 0 1.552l4.488 4.488L4.32 14.85a1.1 1.1 0 0 0 0 1.552 1.1 1.1 0 0 0 1.552 0l4.488-4.488 4.488 4.488a1.1 1.1 0 0 0 1.552 0 1.1 1.1 0 0 0 0-1.552z"></path>
                    </svg>
                </div>);
            }
        })
    });

    return (
        <div className="search-filter-box">
            <div className="filtered-buttons-row">
                <div className="toggle-filter-button" onClick={() => {
                    dispatch({type: types.TOGGLE_FILTER_BOX});
                }}>
                    <span>فیلتر</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.393" height="7.627" viewBox="0 0 12.393 7.627"
                         className="t-chevron-0-1-232">
                        <g id="chevron_up" transform="translate(502.703 750.774) rotate(180)">
                            <path className="svg-c1"
                                  d="M496.507,750.774a1.426,1.426,0,0,1-1.012-.419l-4.766-4.766a1.43,1.43,0,1,1,2.023-2.023l3.754,3.754,3.754-3.754a1.431,1.431,0,0,1,2.023,2.023l-4.766,4.766A1.426,1.426,0,0,1,496.507,750.774Z"></path>
                        </g>
                    </svg>
                </div>
                {filterItems}
                <div className="clear-filtered" onClick={() => {
                    dispatch({type: types.CLEAR_ALL});
                }}>
                    <span>حذف همه فیلتر ها</span>
                </div>
            </div>
            {state['active'] === true && (
                <FilterBox/>
            )}
        </div>
    )
}

export default Filter;
