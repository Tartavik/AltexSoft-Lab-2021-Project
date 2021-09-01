import { UseApi } from '../../../Hooks/UseApi';
import { useDataFetch } from '../../../Hooks/UseDataFetch';
import { useAuth } from '../../../../context/useAuth';

export const UseLoginForm = () => {
    const { userLoginApi } = UseApi();

    const { singIn, getToken, getUser } = useAuth();

    const [loginRes, loginUser] = useDataFetch({
      fetchHandler: async (obj) => {
        try{
          const res = await userLoginApi(obj);
          console.log(res);
          localStorage.setItem('token',res.data.user.token);
          singIn();
          getToken(res.data.user.token)
          getUser(res.data.user)
          return res; 
        }catch(e){
          return e;
        }
  
        },
        isLazy: true,
        initialData: [],
      });

      return {
        logUser: loginRes,
        loginUser: loginUser,

      };
}