import React, {useState} from "react";
import SearchBox from "../components/search/SearchBox";
import './Search.scss';
import {FilterProvider} from "../context/FilterContext";
import {useMenus} from "../context/MenusContext";

const Search = () => {
    let {state: menus} = useMenus();
    let [state, setState] = useState({
        items: [],
        loading: false,
        error: false,
        options: null,
        page: undefined,
        total: undefined
    });
    console.log("Search", state);
    return <div className="search container-fluid">
        <div className="row p-0">
            {menus['data'] != null && menus['loading'] === false && (
                <FilterProvider>
                    <SearchBox onSearchItems={setState}/>
                </FilterProvider>
            )}
        </div>
    </div>
}

export default Search;
