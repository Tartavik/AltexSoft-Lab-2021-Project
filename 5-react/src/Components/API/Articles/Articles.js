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
    console.log(arg, option, baseUrl);
    return axios.post(`${baseUrl}/api/articles/${arg.articleSlug}/comments`, arg.bodyComment, option);
}

export const initDeleteArticalComment = (baseUrl, option) => (arg) => {
    return axios.delete(`${baseUrl}/api/articles/${arg.slug}/comments/${arg.id}`, option);
}