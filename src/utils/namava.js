import Axios from "axios";
import Config from '../config';
export default Axios.create({
    baseURL: Config.baseUrl,
});
