import React, {useEffect} from "react";
import Slider from "../components/slider/Slider";
import MovieItem from "../components/MovieItem";
import RowList from "../components/list/RowList";
import {types, useMenus} from "../context/MenusContext";
import namava from "../utils/namava";

const fetchMenus = async (dispatch) => {
    dispatch({type: types.SET_LOADING})
    let {data: {succeeded, result, error}} = await namava.get('api/v1.0/menus');
    if(succeeded === true && error == null) {
        let homePageIndex = result.findIndex(item => item['slug'] === "index");
        let home = {};
        if(homePageIndex > -1) {
            home = result[homePageIndex];
        }
        dispatch({
            type: types.SET_DATA,
            home: home,
            data: result,
        });
    }else {
        dispatch({type: types.SET_ERRORS, errors: error});
    }
}

const Home = () => {
    let {state: menus, dispatch} = useMenus();
    useEffect(() => {
        if(menus.loading === false && menus.succeeded === false && menus.errors.length === 0) {
            fetchMenus(dispatch);
        }
    }, [dispatch]);


    console.log("Home", menus);
    return (
        <div className="container-fluid">
            <div className="row">
                <Slider sliderID={1316}/>
                <RowList/>
            </div>
        </div>
    )

}

export default Home;
