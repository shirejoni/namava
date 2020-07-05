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



const Home = () => {
    let {state: menus, dispatch} = useMenus();



    console.log("Home", menus);
    return (
        <div className="container-fluid">
            <div className="row">
                {(menus.loading === false && menus.succeeded === true) && menus.home.pageItems.map(({payloadType, payloadKey, ...pageItem}) => {
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

export default Home;
