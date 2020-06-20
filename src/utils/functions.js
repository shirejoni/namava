import namava from "./namava";
import Config from "../config";
import MovieItem from "../components/MovieItem";
import ExclusiveDubItem from "../components/ExclusiveDubItem";

export function getNamavaUrl(url) {
    return `http://namava.ir${url}`;
}
export const fetchData = async (payloadKey, payloadType, onSuccess, onError, setLoading) => {
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
    let {data: {succeeded, result, error}} = await namava.get(url, {
        params: {
            pi: Config.sections[payloadType].pi || undefined,
            ps: Config.sections[payloadType].ps || undefined,
        }
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
