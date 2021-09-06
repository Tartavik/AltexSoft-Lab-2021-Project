import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { FormContext } from './FormContext';

export const useAuth = () => {
     return useContext(AuthContext);
}

export const useForm = () => {
     return useContext(FormContext);
}