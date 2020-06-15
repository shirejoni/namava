import React, {useEffect} from "react";
import Slider from "../components/slider/Slider";
import MovieItem from "../components/MovieItem";
import RowList from "../components/list/RowList";
import {types, useMenus} from "../context/MenusContext";
import namava from "../utils/namava";
import Config from "../config";
import {getItemComponent} from "../utils/functions";

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
    }, [dispatch, menus]);


    console.log("Home", menus);
    return (
        <div className="container-fluid">
            <div className="row">
                {(menus.loading === false && menus.succeeded === true) && menus.home.pageItems.map(({payloadType, payloadKey, ...pageItem}) => {
                    let section = undefined;

                    switch (payloadType) {
                        case Config.pageItemsType.Slider:
                            section = <Slider key={`page-section-${pageItem['pageItemId']}`} sliderID={payloadKey}/>;
                            break;
                        case Config.pageItemsType.Latest:
                        case Config.pageItemsType.LatestEpisods:
                        case Config.pageItemsType.CategoryGroup:
                        case Config.pageItemsType.ExclusiveDubs:
                        case Config.pageItemsType.PostGroup:
                            let itemComponent = getItemComponent(payloadType);
                            section = <RowList key={`page-section-${pageItem['pageItemId']}`} data={{
                                payloadType,
                                payloadKey,
                                title: pageItem['caption']
                            }} ItemComponent={itemComponent}/>
                            break;
                        default:
                            section = undefined;
                    }


                    return section;
                })}
            </div>
        </div>
    )

}

export default Home;
