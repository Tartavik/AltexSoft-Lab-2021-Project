import React, { createContext } from 'react';
import { useModalsProvider } from '../Components/Hooks/useModalsProvider';

export const ModalsContext = createContext();

export const ProviderModals = ({ children }) => {
    const modals = useModalsProvider();
    return <ModalsContext.Provider value={modals}>{ children }</ModalsContext.Provider>
}