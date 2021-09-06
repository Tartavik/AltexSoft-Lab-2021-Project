import React, { createContext } from 'react';
import { useFormProvider } from '../Components/Hooks/useFormProvider';

export const FormContext = createContext();

export const ProviderForm = ({ children }) => {
    const form = useFormProvider();
    return <FormContext.Provider value={form}>{ children }</FormContext.Provider>
}