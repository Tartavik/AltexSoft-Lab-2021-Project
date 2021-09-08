import { useState } from 'react';

export const useFormProvider = () => {

    const [formUpdate, setFormUpdate] = useState();
    const [stateEditForm, setStateEditForm] = useState();

    const [whatShowFormArticle, setShowForm] = useState();
    const [valueFormUpdateArticle, setValueFormUpdateArticle] = useState(null);
    const [stateFormArticle, setStateFormArticle] = useState(false);

    const setFormUpdateUser = (obj) => {
        setFormUpdate(obj)
    }

    const setstateFormEdit = (bool) => {
        setStateEditForm(bool)
    }

    const setShowFormArticle = (value) => {
        setShowForm(value)
    }

    const setFormUpdateArticle = (body) => {
        setValueFormUpdateArticle(body)
    }

    const setStateArticleForm = (bool) => {
        setStateFormArticle(bool)
    }

    return {
        formUpdate,
        setFormUpdateUser,
        stateEditForm,
        setstateFormEdit,
        setShowFormArticle,
        whatShowFormArticle,
        setFormUpdateArticle,
        valueFormUpdateArticle,
        stateFormArticle,
        setStateArticleForm,
    }
}