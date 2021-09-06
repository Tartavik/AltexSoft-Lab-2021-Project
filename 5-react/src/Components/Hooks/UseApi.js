import { initGetArticleApi, initGetArticlesApi, initCreateArticle, initGetArticleComment, initCreateArticleComment, initDeleteArticalComment } from "../API/Articles/Articles";
import { initUserLoginApi, initRegestrationUser, initGetUser, initRegesterNewUser } from "../API/Auth/Auth";
import { initUpdateUserProfile } from "../API/User/User";
import { initGetTag } from "../API/Tag/Tag";

export const UseApi = () => {

    const baseUrl = 'https://conduit.productionready.io';
    const option = {
        headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        },
    }

    return {
        //Articles
        getArticleApi: initGetArticleApi(baseUrl),
        getArticlesApi: initGetArticlesApi(baseUrl),
        createArticle: initCreateArticle(baseUrl,option),
        createArticalComment: initCreateArticleComment(baseUrl, option),
        getArticleComments: initGetArticleComment(baseUrl),
        deleteArticleComment: initDeleteArticalComment(baseUrl, option),

        //Auth
        userLoginApi: initUserLoginApi(baseUrl),
        userCheckReg: initRegestrationUser(baseUrl),
        registerUser: initRegesterNewUser(baseUrl),

        //User
        getUser: initGetUser(baseUrl),
        updateUserProfile: initUpdateUserProfile(baseUrl, option),

        //Tag
        getTag: initGetTag(baseUrl),
    }
}
