import axios from "axios";

export const initGetArticlesApi = (baseUrl) => () => {
    return axios.get(`${baseUrl}/api/articles`)
}  

export const initGetArticleApi = (baseUrl) => (slug) => {
    return axios.get(`${baseUrl}/api/articles${slug}`)
}

export const initCreateArticle = (baseUrl, option) => (article) => {
    return axios.post(`${baseUrl}/api/articles`, article, option);
}

export const initGetArticleComment = (baseUrl) => (slug) => {
    return axios.get(`${baseUrl}/api/articles/${slug}/comments`);
}

export const initCreateArticleComment = (baseUrl, option) => (arg) => {
    return axios.post(`${baseUrl}/api/articles/${arg.articleSlug}/comments`, arg.bodyComment, option);
}

export const initDeleteArticalComment = (baseUrl, option) => (arg) => {
    return axios.delete(`${baseUrl}/api/articles/${arg.slug}/comments/${arg.id}`, option);
}

export const initAddFavoriteArticle = (baseUrl, option) => (slug) => {
    return axios.post(`${baseUrl}/api/articles/${slug}/favorite`, {}, option);
}

export const initDeleteFavoriteArticle = (baseUrl, option) => (slug) => {
    return axios.delete(`${baseUrl}/api/articles/${slug}/favorite`, option);
}

export const initDeleteArticle = (baseUrl, option) => (slug) => {
    return axios.delete(`${baseUrl}/api/articles/${slug}`, option);
}