import { useState } from 'react';

export const useAuhtProvider = () => {
    const [isSignedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [userNameProfile, setUserNameProfile] = useState();

    const singIn = () => {
        setSignedIn(true)
    }

    const singOut = () => {
        setSignedIn(false)
    }

    const getToken = (token) => {
        setToken(token)
    }

    const getUser = (user) => {
        setUser(user)
    }

    const getuserNameProfile = (name) => {
        setUserNameProfile(name)
    }

    return {
        isSignedIn,
        singIn,
        singOut,
        user,
        token,
        getToken,
        getUser,
        getuserNameProfile,
        userNameProfile,
    }
}