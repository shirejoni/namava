import React from "react";
import SearchBox from "../components/search/SearchBox";
import './Search.scss';
import {FilterProvider} from "../context/FilterContext";
import {useMenus} from "../context/MenusContext";

const Search = () => {
    let {state: menus} = useMenus();
    return <div className="search container-fluid">
        <div className="row p-0">
            {menus['data'] != null && menus['loading'] === false && (
                <FilterProvider>
                    <SearchBox/>
                </FilterProvider>
            )}
        </div>
    </div>
}

export default Search;
