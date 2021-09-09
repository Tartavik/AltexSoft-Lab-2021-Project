import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { FormContext } from './FormContext';
import { ModalsContext } from './ModalsContext';

export const useAuth = () => {
     return useContext(AuthContext);
}

export const useForm = () => {
     return useContext(FormContext);
}

export const useModals = () => {
     return useContext(ModalsContext);
}