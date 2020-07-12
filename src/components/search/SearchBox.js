import React, {useEffect, useState} from "react";
import Filter from "./Filter";
import {useFilter} from "../../context/FilterContext";
import {useHistory, useLocation} from 'react-router-dom';
import {searchCountriesFilter} from "../../utils/functions";

const fetchSearchItems = (queryString, filter, term , onSearchItems) => {
    let urlSearchParams = new URLSearchParams(queryString);
    let params = {};
    params = {...params, ...searchCountriesFilter(urlSearchParams, filter)}

    console.log("fetchSearchItems", urlSearchParams, params);
};

const SearchBox = ({onSearchItems}) => {

    let {state, dispatch} = useFilter(true);
    let location = useLocation();
    let params = new URLSearchParams(location['search'].substr(1));
    let [term, setTerm] = useState(params.get('query') || "");
    let history = useHistory();
    const onQueryStringChange = (queryString) => {
        if(term !== "") {
            queryString = `term=${term}${queryString !== "" ? "&" + queryString : ""}`;
        }
        history.push({
            pathname: "/search",
            search: queryString,
        });
        fetchSearchItems(queryString, state['filters'], term, onSearchItems);
    };

    useEffect(() => {
        if(state['done'] === true) {
            onQueryStringChange(state['queryString']);
        }
    }, [state['queryString'], term]);
    return <React.Fragment>
        <div className="col-12 search-form-container">
            <div className="leave-search">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path className="svg-c1"
                          d="M16.4 14.85l-4.488-4.488L16.4 5.874a1.1 1.1 0 0 0 0-1.552 1.1 1.1 0 0 0-1.552 0L10.36 8.8 5.873 4.322a1.1 1.1 0 0 0-1.552 0 1.1 1.1 0 0 0 0 1.552l4.488 4.488L4.32 14.85a1.1 1.1 0 0 0 0 1.552 1.1 1.1 0 0 0 1.552 0l4.488-4.488 4.488 4.488a1.1 1.1 0 0 0 1.552 0 1.1 1.1 0 0 0 0-1.552z"></path>
                </svg>
                <span>بستن</span>
            </div>
            <div className="search-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                     className="t-searchIcon-0-1-228">
                    <path className="svg-c1"
                          d="M23.175 7.15a9.78 9.78 0 0 0-7.108-3.394q-.17-.006-.342-.006a9.9 9.9 0 0 0-6.979 2.883 9.85 9.85 0 0 0-1.483 12.046 1.84 1.84 0 0 1-.264 2.252l-3.68 3.68a1.1 1.1 0 0 0-.317.79.94.94 0 0 0 .288.68c.394.353.992.344 1.375-.02l3.73-3.732c.587-.595 1.505-.712 2.223-.283 1.54.93 3.303 1.42 5.1 1.418a9.88 9.88 0 0 0 7.418-3.358c3.24-3.706 3.256-9.23.04-12.956zm-1.44 11.56a7.89 7.89 0 0 1-12.022.002c-2.48-2.95-2.48-7.258 0-10.21a7.89 7.89 0 0 1 12.025-.001c2.48 2.952 2.477 7.258-.003 10.208z"></path>
                </svg>
                <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="فیلم، سریال، بازیگر و ژانر"/>
            </div>
        </div>
        <Filter/>

    </React.Fragment>
}

export default SearchBox;
