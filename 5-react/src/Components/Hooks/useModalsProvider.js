import { useState } from "react";

export const useModalsProvider = () => {
    const [modals, setModals] = useState([]);

    const openModal = (modal) => {
       const modalExist = modals.find((el) => el.name === modal.name);
        if(!modalExist){
            setModals(prev => [...prev,modal]);
        }
    }

    const closeModal = (modal) => {
        setModals(prev => prev.filter((m) => m.name !== modal.name)) 
    }

    const closeAllModals = () => {
        setModals([]);
    }

    return {
        openModal,
        modals,
        closeModal,
        closeAllModals,
    }   
}