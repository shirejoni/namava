import React from "react";


const Filter = () => {

    return (
        <div className="search-filter-box">
            <div className="filtered-buttons-row">
                <div className="toggle-filter-button">
                    <span>فیلتر</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.393" height="7.627" viewBox="0 0 12.393 7.627"
                         className="t-chevron-0-1-232">
                        <g id="chevron_up" transform="translate(502.703 750.774) rotate(180)">
                            <path className="svg-c1"
                                  d="M496.507,750.774a1.426,1.426,0,0,1-1.012-.419l-4.766-4.766a1.43,1.43,0,1,1,2.023-2.023l3.754,3.754,3.754-3.754a1.431,1.431,0,0,1,2.023,2.023l-4.766,4.766A1.426,1.426,0,0,1,496.507,750.774Z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Filter;
