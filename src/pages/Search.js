import React, {useState} from "react";
import SearchBox from "../components/search/SearchBox";
import './Search.scss';
import {FilterProvider} from "../context/FilterContext";
import {useMenus} from "../context/MenusContext";
import MultiLineList from "../components/list/MultiLineList";
import MovieItem from "../components/MovieItem";

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
        <div className="row p-0 mt-3">
            {state['loading'] === false && state['items'].length > 0 && (
                <MultiLineList data={{
                    payloadType: "SearchAdvanced",
                    payloadKey: 0,
                    items: state['items'],
                    showMore: true,
                    key: 'id',
                    page: state['page'],
                    options: state['params'],
                }} preview={true} firstRequest={false} ItemComponent={MovieItem}/>
            )}
        </div>
    </div>
}

export default Search;
