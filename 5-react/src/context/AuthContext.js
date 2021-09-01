import react, { createContext } from 'react';
import { useAuhtProvider } from '../Components/Hooks/useAuhtProvider';


export const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
    const auth = useAuhtProvider();
 
    return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
}

