import axios from "axios";

export const initUpdateUserProfile = (baseUrl, option) => (body) => {
    return axios.put(`${baseUrl}/api/user`, body, option);
}