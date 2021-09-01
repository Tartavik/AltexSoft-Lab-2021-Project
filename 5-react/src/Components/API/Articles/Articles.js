import axios from "axios";

export const initGetArticlesApi = (baseUrl) => () => {
    return axios.get(`${baseUrl}/api/articles`)
}  

export const initGetArticleApi = (baseUrl) => (slug) => {
    return axios.get(`${baseUrl}/api/articles${slug}`)
}