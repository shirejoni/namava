import namava from "./namava";
import Config from "../config";
import MovieItem from "../components/MovieItem";
import ExclusiveDubItem from "../components/ExclusiveDubItem";
import momentj from 'moment-jalaali';
import 'moment-timezone';
import fa from 'moment/dist/locale/fa';
import React from "react";

export function getItemUrl(item, itemType = false) {
    let type = 'movie';
    if(item['type'] != null && item['type'].toLowerCase() === Config.itemTypes.Series.toLowerCase()) {
        type = Config.itemTypes.Series.toLowerCase();
    }
    let title = item['caption'] || item['title'] || item['castName'];
    if(title) {
        title = title.replace(/[^a-zA-Z0-9\u0633\u06A9\u06AF\u06C0\u06CC\u060C\u062A\u062B\u062C\u062D\u062E\u062F\u063A\u064A\u064B\u064C\u064D\u064E\u064F\u067E\u0670\u0686\u0698\u200C\u0621-\u0629\u0630-\u0639\u0641-\u0654]/g, '_');
    }
    let link = '/';
    if(itemType === false) {
        link =`/${type}/`;
    }else if(itemType === "Collection") {
        link =`/collection-`;
    }else if(itemType === "Person") {
        link =`/person-`;
    }
    let prefix = '';
    if(item['id'] && itemType === false) {
        link += item['id'];
        prefix = "-";
    }
    if(item['referenceId'] && itemType === "Collection") {
        link += item['referenceId'];
        prefix = "-";
    }
    if(item['castId'] && itemType === "Person") {
        link += item['castId'];
        prefix = "-";
    }
    if(title) {
        link += `${prefix}${title}`;
    }
    return link;
}

export function getNamavaUrl(url) {
    return `http://namava.ir${url}`;
}
export const fetchData = async (payloadKey, payloadType, onSuccess, onError, setLoading, options = {}) => {
    if(setLoading) {
        setLoading(true);
    }
    let section = Config.sections[payloadType];
    if(section === undefined || section.url == null) {
        if(setLoading) {
            setLoading(false);
        }
        onError(`payloadType: ${payloadType} is not supported in url`);
        return;
    }
    let url = section.url.replace('{{PAYLOAD_KEY}}', payloadKey);
    let params = {};
    console.log(options);
    for(let key in section) {
        if(key !== 'url') {
            params[key] = options[key];
            if(params[key] === undefined && section[key] !== undefined) {
                params[key] = section[key];
            }
        }
    }
    let {data: {succeeded, result, error}} = await namava.get(url, {
        params: params
    });
    if(setLoading) {
        setLoading(false);
    }
    if(succeeded === true && error == null) {
        onSuccess(result);
    }else {
        onError(error);
    }
}

export const fetchBriefData = async (id, onSuccess, onError, setLoading) => {
    if(setLoading) {
        setLoading(true);
    }
    let section = Config.sections.BriefData;
    if(section === undefined || section.url == null) {
        if(setLoading) {
            setLoading(false);
        }
        onError(`payloadType: BriefData is not supported in url`);
        return;
    }
    let url = section.url.replace('{{ID}}', id);
    let {data: {succeeded, result, error}} = await namava.get(url);
    if(setLoading) {
        setLoading(false);
    }
    if(succeeded === true && error == null) {
        onSuccess(result);
    }else {
        onError(error);
    }
}

export function getItemComponent(payloadType) {
    switch (payloadType) {
        case Config.pageItemsType.Latest:
        case Config.pageItemsType.LatestEpisods:
        case Config.pageItemsType.CategoryGroup:
        case Config.pageItemsType.PostGroup:
            return MovieItem;
        case Config.pageItemsType.ExclusiveDubs:
            return ExclusiveDubItem;
        default:
            return undefined;
    }
}

export function getCoords(elem) {
    const box = elem.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top  = box.top +  scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

export  function getMediaDetailText(caption, items, maxLength, keyType, separator = '-') {
    let content = [];
    if(items == null || items.length === 0) {
        return;
    }
    for(let i =0; i < maxLength && i < items.length; i++) {
        content.push(<a href="#" key={`text-${keyType}-${items[i][keyType + "Id"]}`}>{items[i][keyType + "Name"] || items[i]["name"]}</a>);
        content.push(<span key={`text-separator-${keyType}-${items[i][keyType + "Id"]}`} className="separator">{separator}</span>);
    }
    content.pop();
    return (
        <div className="detail-row text-row">
            <span>{caption}: </span>
            {content}
        </div>
    )
}

export const searchCountriesFilter = (params, filters) => {
    let countries = [];
    let optionsId = params.get('country') ? params.get('country').split(',') : [];
    let countryFilter;
    for(let key in filters) {
        if(filters[key]['slug'] === "country") {
            countryFilter = filters[key];
            break;
        }
    }
    if(countryFilter) {
        optionsId.forEach(optionId => {
            let option = countryFilter.options.find(filterOption => filterOption['optionId'] == optionId);
            if(option && option['slug']) {
                countries.push(option['slug']);
            }
        });
    }

    return {
        CountryProducer: countries.length > 0 ? countries.join(',') : undefined,
    }
}

export const searchGenereFilter = (params, filters) => {
    let optionsId = params.get('genre') || undefined;
    return {
        subcategories: optionsId
    }
}


export const searchYearFilter = (params, filters) => {
    let year = params.get('year') || undefined;
    let startYear, endYear;
    if(year) {
        let parts = year.split('-');
        momentj.locale("fa", fa);
        momentj.loadPersian({
            usePersianDigits: false ,
        });
        startYear = new momentj(parts[0]).tz("Asia/Tehran").locale('fa').format("jYYYY");
        endYear = new momentj(parts[1]).tz("Asia/Tehran").locale('fa').format("jYYYY");
    }

    return {
        ADProductionYear: year,
        PersianProductionYear: (startYear && endYear) ? `${startYear}-${endYear}` : undefined,
    }
}

export const searchSortFilter = (params, filters) => {
    let sort = params.get('sort') ? params.get('sort') : undefined;
    if(sort) {
       let sortFilter;
       for(let key in filters) {
           if(filters[key]['slug'] === "sort") {
               sortFilter = filters[key];
               break;
           }
       }
        if(sortFilter && sortFilter.selected.length > 0) {
            sort = sortFilter.options[sortFilter.selected[0].optionIndex].slug;
        }
    }


    return {
        searchOrderType: sort,
    }
}
