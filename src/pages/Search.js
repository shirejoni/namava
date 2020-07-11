import React from "react";
import SearchBox from "../components/search/SearchBox";
import './Search.scss';

const Search = () => {


    return <div className="search container-fluid">
        <div className="row p-0">
            <SearchBox/>
        </div>
    </div>
}

export default Search;
