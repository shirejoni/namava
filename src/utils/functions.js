import namava from "./namava";
import Config from "../config";

export function getNamavaUrl(url) {
    return `http://namava.ir${url}`;
}
export const fetchData = async (payloadKey, payloadType, onSuccess, onError, setLoading) => {
    if(setLoading) {
        setLoading(true);
    }
    let section = Config.sections[payloadType];
    if(section == undefined || section.url == null) {
        if(setLoading) {
            setLoading(false);
        }
        onError(`payloadType: ${payloadType} is not supported in url`);
        return;
    }
    console.log(section);
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
