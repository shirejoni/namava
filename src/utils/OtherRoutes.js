import React from 'react';
import {Route, Switch} from "react-router-dom";
import {useMenus} from "../context/MenusContext";
import Page from "../pages/Page";


const OtherRoutes = () => {
    let {state:menus} = useMenus();
    return (<div>
        <Switch>
            {menus['loading'] === false && menus['data'] !== null && menus['data'].map(menuItem => {
                if(menuItem['slug'] == null || menuItem['pageItems'].length === 0) {
                    return;
                }
                return <Route path={`/${menuItem['slug']}`} exact={true} component={Page}/>
            })}
        </Switch>
    </div>)

}

export default OtherRoutes;
