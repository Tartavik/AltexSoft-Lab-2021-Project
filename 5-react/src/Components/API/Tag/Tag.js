import axios from "axios";

export const initGetTag = (baseUrl) => () => {
    return axios.get(`${baseUrl}/api/tags`);
}