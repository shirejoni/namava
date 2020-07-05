import React, {useEffect, useRef} from "react";
import './TopMenu.scss';
import {Link} from "react-router-dom";
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

const TopMenu = () => {

    let {state: menus, dispatch} = useMenus();

    useEffect(() => {
        if(menus.loading === false && menus.succeeded === false && menus.errors.length === 0) {
            fetchMenus(dispatch);
        }
    }, [dispatch, menus]);

    let windowPageOffserRef = useRef(window.pageYOffset);
    let topMenuRef = useRef(null);

    useEffect(() => {
        const onScrollHandler = () => {
            if(topMenuRef.current === null) {
                return;
            }
            let currentPageOffset = window.pageYOffset;
            if(currentPageOffset === 0) {
                topMenuRef.current.classList.remove('floating');
                topMenuRef.current.classList.remove('sticky');
            }else if(currentPageOffset < windowPageOffserRef.current) {
                topMenuRef.current.classList.remove('floating');
                topMenuRef.current.classList.add('sticky');
            }else {
                topMenuRef.current.classList.add('floating');
                topMenuRef.current.classList.remove('sticky');
            }
            windowPageOffserRef.current = currentPageOffset;
        }
        window.addEventListener('scroll', onScrollHandler);
        return () => {
            window.removeEventListener('scroll', onScrollHandler);
        }
    })

    let topMenu;
    let topMenuItems = []
    if(menus['data'] != null && menus['loading'] === false) {
        topMenu = menus['data'].find(menuItem => menuItem['slug'] === "TopMenu");
        topMenuItems = menus['data'].filter(menuItem => menuItem['parentId'] === topMenu['menuId']);
    }


    return <div className="top-menu" ref={topMenuRef}>
        <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="30" viewBox="0 0 47 30"
                 className="t-mainLogo-0-1-24">
                <path className="svg-c1"
                      d="M14.022 17.41l-1.5.17v-.044a2.35 2.35 0 0 1-.274.037 12.87 12.87 0 0 1-2.95.1c-.456-.048-.906-.135-1.347-.26a2.47 2.47 0 0 1-.882-.435 1.9 1.9 0 0 1-.164-.148 1.99 1.99 0 0 1-.51-.9 2.72 2.72 0 0 1-.071-.347.44.44 0 0 1 0-.089v-4.088c.001-.27.04-.54.113-.8.033-.11.074-.216.124-.318a2.08 2.08 0 0 1 .349-.507l.027-.026a1.81 1.81 0 0 1 .514-.334 6.3 6.3 0 0 1 1.626-.438c.588-.088 1.18-.14 1.774-.153h.487l1.216.05c.55.04 1.094.118 1.632.235a3.35 3.35 0 0 1 1.527.667.42.42 0 0 1 .036.033c.167.18.298.388.387.616.023.06.043.12.06.183a2.01 2.01 0 0 1 .074.542v8.435a2.19 2.19 0 0 1-.062.533 1.78 1.78 0 0 1-.763 1.064 3.6 3.6 0 0 1-1.329.5l-.127.024a12.41 12.41 0 0 1-1.417.15l-1.35.026-.3-.01c-.796-.014-1.6-.083-2.377-.206l-.212-.068a.41.41 0 0 1-.241-.477 2.26 2.26 0 0 1 .1-.376c.035-.1.086-.192.15-.275a.7.7 0 0 1 .687-.245l.38.04a31.14 31.14 0 0 0 2.479.081l.192-.005c.468-.01.934-.07 1.4-.175.17-.036.325-.122.446-.246a.49.49 0 0 0 .12-.333V17.41zm0-1.733v-4.39a.4.4 0 0 0-.026-.147c-.02-.053-.053-.1-.093-.14-.405-.228-.862-.35-1.327-.356l-.6-.047a12.45 12.45 0 0 0-1.506.015c-.486.026-.967.104-1.436.232-.1.028-.19.08-.264.15a.57.57 0 0 0-.119.163 1.51 1.51 0 0 0-.113.638v3.528c.01.085.036.168.073.245a.47.47 0 0 0 .113.147.59.59 0 0 0 .169.1.75.75 0 0 0 .084.027 1.34 1.34 0 0 0 .165.039 11.42 11.42 0 0 0 3.338-.029l.262-.033.236-.033c.035-.005.07-.005.106 0zM3.037 8.807h.8a1.21 1.21 0 0 1 .853.352l.026.027a1.2 1.2 0 0 1 .16.21 1.18 1.18 0 0 1 .17.609v11.46a.4.4 0 0 1-.406.4h-.8a1.14 1.14 0 0 1-.484-.109c-.14-.065-.266-.156-.372-.267a1.27 1.27 0 0 1-.355-.86V9.21c.008-.22.187-.396.408-.4zm15.07 0h.735c.457-.001.875.256 1.08.664.083.165.127.348.13.533v9.29c-.01.122.018.244.08.35l.005.006.008.01a.62.62 0 0 0 .252.158l.113.04.178.05.3.065.3.05.3.036.3.027.308.02.312.01h.64l.33-.01.34-.02.35-.03.36-.046.368-.066a2.64 2.64 0 0 0 .363-.1c.083-.028.16-.07.23-.122l.018-.02c.022-.02.042-.043.06-.068s.026-.04.035-.064c.02-.047.03-.097.03-.147v-4.19c.001-.08.006-.16.017-.24a1.98 1.98 0 0 1 .128-.482l.02-.042a1.88 1.88 0 0 1 .181-.314 1.94 1.94 0 0 1 .215-.256.41.41 0 0 1 .038-.033 1.62 1.62 0 0 1 .25-.183 4.55 4.55 0 0 1 1.3-.473 13.8 13.8 0 0 1 2.435-.3l.8-.017 1.5.06a11.23 11.23 0 0 1 2.13.36c.418.1.8.29 1.15.554a.38.38 0 0 1 .037.032l.105.115a1.9 1.9 0 0 1 .313.5c.05.123.088.25.112.38a1.88 1.88 0 0 1 .033.344v4.183c-.001.05.01.1.028.147.01.026.026.05.043.073s.03.036.045.053l.01.01a2.92 2.92 0 0 0 1.358.35c.4.04.85.06 1.306.06.83.034 1.663-.065 2.463-.294.07-.027.134-.064.192-.11l.02-.02a.4.4 0 0 0 .088-.127c.02-.045.03-.094.03-.143v-4.2c0-.177.04-.35.117-.5.2-.42.625-.69 1.09-.688h.8c.223-.001.405.177.408.4v5.126a1.86 1.86 0 0 1-.145.725c-.017.04-.037.08-.057.12-.093.185-.214.354-.36.5a.46.46 0 0 1-.037.033 2.9 2.9 0 0 1-1.123.538 12.46 12.46 0 0 1-2.934.39h-.018a15.54 15.54 0 0 1-3.695-.3 5.27 5.27 0 0 1-.843-.261c-.372.148-.756.26-1.15.337-.45.09-.906.158-1.364.2l-1.307.072h-.345c-.29 0-.578-.007-.864-.02l-1.1-.088-1.016-.157a7.1 7.1 0 0 1-.964-.258l-.222-.085c-.115.05-.242.094-.377.136l-.5.133q-.236.054-.494.1l-.484.072-.472.053-.46.037q-.194.013-.4.022h-.06q-.22.01-.44.013-.22.004-.432 0-.213 0-.426-.007-.213-.007-.42-.017-.21-.01-.42-.026l-.417-.036-.417-.05-.418-.062-.418-.08-.15-.033-.267-.07-.41-.135a2.87 2.87 0 0 1-.389-.184 2.09 2.09 0 0 1-.331-.232l-.02-.018c-.11-.097-.206-.208-.288-.33a1.71 1.71 0 0 1-.2-.409c-.052-.155-.085-.316-.1-.48l-.013-.27V9.21a.4.4 0 0 1 .067-.231.41.41 0 0 1 .334-.173zm11.682 11.29l1.226.05h.147a13.32 13.32 0 0 0 1.457-.087c.43-.017.852-.135 1.228-.346l.018-.02a.4.4 0 0 0 .088-.126c.018-.047.026-.098.024-.148v-4.05c0-.05-.01-.1-.03-.147a.4.4 0 0 0-.088-.126l-.01-.01a.7.7 0 0 0-.17-.106 7.89 7.89 0 0 0-2.671-.335c-.967-.08-1.94.07-2.837.438l-.014.015c-.02.018-.035.038-.05.06s-.027.043-.037.067c-.02.047-.03.097-.03.147v4.05a.38.38 0 0 0 .029.147.39.39 0 0 0 .071.11l.016.015.02.02c.046.037.096.068.15.093a4.74 4.74 0 0 0 1.455.291zm12.975-9.888h.885c.47-.001.85.378.854.847v.665c-.003.47-.385.848-.854.847h-.885c-.47.001-.85-.378-.854-.847v-.666c.004-.47.385-.847.854-.846z"></path>
            </svg>
        </div>
        <nav className="nav">
            {topMenuItems.map(topMenuItem => (
                <Link key={`top-menu-item-${topMenuItem['menuId']}`} to={topMenuItem['slug'] === 'index' ? "/" : topMenuItem['slug']} className="nav-item">{topMenuItem['caption']}</Link>
            ))}
        </nav>
        <a href="#" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                 className="t-icon-0-1-17">
                <path className="svg-c1"
                      d="M23.175 7.15a9.78 9.78 0 0 0-7.108-3.394q-.17-.006-.342-.006a9.9 9.9 0 0 0-6.979 2.883 9.85 9.85 0 0 0-1.483 12.046 1.84 1.84 0 0 1-.264 2.252l-3.68 3.68a1.1 1.1 0 0 0-.317.79.94.94 0 0 0 .288.68c.394.353.992.344 1.375-.02l3.73-3.732c.587-.595 1.505-.712 2.223-.283 1.54.93 3.303 1.42 5.1 1.418a9.88 9.88 0 0 0 7.418-3.358c3.24-3.706 3.256-9.23.04-12.956zm-1.44 11.56a7.89 7.89 0 0 1-12.022.002c-2.48-2.95-2.48-7.258 0-10.21a7.89 7.89 0 0 1 12.025-.001c2.48 2.952 2.477 7.258-.003 10.208z"></path>
            </svg>
        </a>
        <a href="#" className="buy-plan"> خرید اشتراک</a>
        <a href="#" className="login-button">ورود / ثبت نام</a>
    </div>
}

export default TopMenu;
