import React from "react";
import './FilterBox.scss';
import {types, useFilter} from "../../context/FilterContext";
import FilterOptions from "./FilterOptions";
const FilterBox = () => {
    let {state, dispatch} = useFilter();
    return (<div className="filter-box">
        <div className="filters-tab">
            {state['filters']['filtersId'].map(filterId => {

                return <div className={`filter-tab ${state['selectedTab'] === filterId && 'active'}`} onClick={() => {
                    if(state['selectedTab'] !== filterId) {
                        dispatch({
                            type: types.SET_SELECTED_TAB,
                            selectedTab: filterId,
                        });
                    }
                }}>
                    {state['filters'][filterId]['caption']}
                    {state['selectedTab'] === filterId && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"
                             className="t-icon-0-1-253 t-activeIcon-0-1-254">
                            <path className="svg-c1"
                                  d="M7.59 10.645c-.28.001-.55-.11-.75-.3L3.313 6.808a1.06 1.06 0 0 1 .475-1.775 1.06 1.06 0 0 1 1.025.275l2.78 2.778 2.778-2.778a1.06 1.06 0 1 1 1.5 1.5l-3.527 3.527c-.2.2-.47.312-.754.3z"></path>
                        </svg>
                    )}
                </div>
            })}
        </div>
        <div className="filter-content">
            <FilterOptions dispatch={dispatch} filter={state['filters'][state['selectedTab']]}/>
        </div>
    </div>)
}

export default FilterBox;
