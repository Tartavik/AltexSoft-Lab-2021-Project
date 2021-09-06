import { useState } from 'react';

export const useFormProvider = () => {

    const [formUpdate, setFormUpdate] = useState();
    const [stateEditForm, setStateEditForm] = useState();

    const setFormUpdateUser = (obj) => {
        setFormUpdate(obj)
    }

    const setstateFormEdit = (bool) => {
        setStateEditForm(bool)
    }

    return {
        formUpdate,
        setFormUpdateUser,
        stateEditForm,
        setstateFormEdit,
    }
}