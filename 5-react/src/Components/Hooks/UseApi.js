import { initGetArticleApi, initGetArticlesApi } from "../API/Articles/Articles";
import { initUserLoginApi, initRegestrationUser, initGetUser, initRegesterNewUser } from "../API/Auth/Auth";

export const UseApi = () => {
    const baseUrl = 'https://conduit.productionready.io';
    return {
        //Articles
        getArticleApi: initGetArticleApi(baseUrl),
        getArticlesApi: initGetArticlesApi(baseUrl),

        //Auth
        userLoginApi: initUserLoginApi(baseUrl),
        userCheckReg: initRegestrationUser(baseUrl),
        registerUser: initRegesterNewUser(baseUrl),

        //User
        getUser: initGetUser(baseUrl),

    }
}
