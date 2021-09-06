import React, { createContext, useEffect } from 'react';
import { useAuhtProvider } from '../Components/Hooks/useAuhtProvider';
import { UseApi } from '../Components/Hooks/UseApi';
import { useDataFetch } from '../Components/Hooks/UseDataFetch';


export const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
    const auth = useAuhtProvider();

    const { userCheckReg } = UseApi();
    const header = {
           headers:{
             'Authorization': `Token ${localStorage.getItem('token')}`
           }
         }; 
    
    const { singIn, getToken, getUser } = auth;

    const [authState, checkUserReg] = useDataFetch({
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
        isLoadingInitial: true,
        initialData: [],
    });

    useEffect(() => {
        checkUserReg();
    }, []); 

    return !authState.isLoading
    ?<AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
    :'LOADING...';

    // return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
}

