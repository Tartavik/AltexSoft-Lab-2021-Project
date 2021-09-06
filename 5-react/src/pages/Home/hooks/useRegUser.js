import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';
import { useEffect } from "react";
import { useAuth } from '../../../context/useAuth';

export const useRegUser = () => {
    const { userCheckReg  } = UseApi();
    const header = {
           headers:{
             'Authorization': `Token ${localStorage.getItem('token')}`
           }
         }; 
    
         const { singIn, getToken, getUser } = useAuth();
    const [isLoad, checkUserReg] = useDataFetch({
        fetchHandler: async () => {
            try{
                const res = await userCheckReg(header);
                singIn();
                getToken(res.data.user.token);
                getUser(res.data.user);
                return res;   
            }catch(e) {
                return e;
            }

        },
        isLazy: true,
        initialData: [],
    });

    useEffect(() => {
        checkUserReg();
    }, []); 

    return {
        checkUserReg,
        isLoad,
    }

}