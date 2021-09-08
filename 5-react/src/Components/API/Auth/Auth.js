import axios from "axios";

export const initUserLoginApi = (baseUrl) => (user) => {
    return axios.post(`${baseUrl}/api/users/login`, user);
}  

export const initRegestrationUser = (baseUrl) => (option) => {
    return axios.get(`${baseUrl}/api/user`, option)
}

export const initGetUser = (baseUrl) => (user) => {
    return axios.get(`${baseUrl}/api/profiles/${user}`)
}

export const initRegesterNewUser = (baseUrl) => (option) => {
    console.log(option);
    return axios.post(`${baseUrl}/api/users`, option)
}