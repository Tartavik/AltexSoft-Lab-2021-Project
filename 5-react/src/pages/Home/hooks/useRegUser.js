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
    
         const { singIn, getToken, getUser, getuserNameProfile } = useAuth();
    const [isLoad, checkUserReg] = useDataFetch({
        fetchHandler: async () => {
            try{
                const res = await userCheckReg(header);
                console.log(res);
                singIn();
                getToken(res.data.user.token);
                getUser(res.data.user);
                getuserNameProfile(res.data.user.username)
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