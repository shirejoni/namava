import React, {useEffect} from "react";
import Slider from "../components/slider/Slider";
import MovieItem from "../components/MovieItem";
import RowList from "../components/list/RowList";
import {types, useMenus} from "../context/MenusContext";
import namava from "../utils/namava";
import Config from "../config";
import {getItemComponent} from "../utils/functions";
import AdsItem from "../components/AdsItem";
import BannerItem from "../components/BannerItem";
import {useLocation} from 'react-router-dom';



const Page = () => {
    let {state: menus, dispatch} = useMenus();
    let location = useLocation();
    let page;
    if(menus['loading'] === false && menus['data'] !== null) {
        page = menus['data'].find(menuItem => {
            if(menuItem['slug'] != "" && menuItem['slug'] === location.pathname.substr(1).toLowerCase()) {
                return true;
            }
            if(menuItem['slug'] === "index" && location.pathname === "/") {
                return true;
            }
            return false;
        });
    }
    console.log("Page", page, location);
    return (
        <div className="container-fluid">
            <div className="row">
                {(menus.loading === false && menus.succeeded === true && page) && page.pageItems.map(({payloadType, payloadKey, ...pageItem}) => {
                    let section = undefined;
                    let preview = false;
                    switch (payloadType) {
                        case Config.pageItemsType.Slider:
                            section = <Slider key={`page-section-${pageItem['pageItemId']}`} sliderID={payloadKey}/>;
                            break;
                        case Config.pageItemsType.Latest:
                        case Config.pageItemsType.LatestEpisods:
                        case Config.pageItemsType.CategoryGroup:
                        case Config.pageItemsType.ExclusiveDubs:
                        case Config.pageItemsType.PostGroup:
                            preview = true;
                            let itemComponent = getItemComponent(payloadType);
                            if(page['slug'] === "movies") {
                                switch (payloadType) {
                                    case Config.pageItemsType.Latest:
                                        payloadType = Config.pageItemsType.LatestMovies;
                                        break;
                                    case Config.pageItemsType.ExclusiveDubs:
                                        payloadType = Config.pageItemsType.ExclusiveDubsMovies;
                                        break;
                                }
                            }

                            section = <RowList preview={preview} key={`page-section-${pageItem['pageItemId']}`} data={{
                                payloadType,
                                payloadKey,
                                title: pageItem['caption']
                            }} ItemComponent={itemComponent}/>
                            break;
                        case Config.pageItemsType.Advertisement:
                            section = <RowList className="Advertisement" key={`page-section-${pageItem['pageItemId']}`} data={{
                                payloadType,
                                payloadKey
                            }} ItemComponent={AdsItem}/>

                                break;
                        case Config.pageItemsType.BannerGroup:
                            section = <RowList className="Banner" key={`page-section-${pageItem['pageItemId']}`} data={{
                                payloadType,
                                payloadKey
                            }} ItemComponent={BannerItem}/>

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

export default Page;
