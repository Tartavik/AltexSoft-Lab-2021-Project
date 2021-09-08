import newArticle from "./newArticle.module.css";
import { useCreateArticle } from "./useCreateArticle";
import { useEffect, useState } from "react";
import { useForm } from "../../context/useAuth";
import { FastField, withFormik, Form as FormikForm } from "formik";
import { FormSchemaArticle } from "../../Components/FormsSchema/FormSchemaArticle";

const DEFAULT_VALUES = {}

const NewArticle = (props) => {
    console.log(props);
    const { showDataArticle, fetchArticle } = useCreateArticle();
    const { whatShowFormArticle, valueFormUpdateArticle, stateFormArticle, setStateArticleForm} = useForm();
    const [articleTitlte, setArticleTitle ] = useState('');
    const [article, setArticle ] = useState('');
    const [description, setDescription ] = useState('');
    const [tagList, setTagList] = useState('');
    const bodyArtylce = {
        article: {
            title: articleTitlte,
            description: description,
            body: article,
            tagList: []
          }
    }

    useEffect(()=>{
        if(valueFormUpdateArticle !== null){
            setArticleTitle(valueFormUpdateArticle.article.title);
            setArticle(valueFormUpdateArticle.article.body);
            setDescription(valueFormUpdateArticle.article.description);
            setTagList(valueFormUpdateArticle.article.tagList);
        }
    },[valueFormUpdateArticle]);

    


    const createNewArticle = (e) => {
        e.preventDefault();
        createTag(e.target[3]);
        setStateArticleForm(false);
        fetchArticle(bodyArtylce);

    }

    const changeArticleTitle = (e) => {
        setArticleTitle(e.currentTarget.value);
    }

    const changeDescription = (e) => {
        setDescription(e.currentTarget.value)
    }

    const changeArticle = (e) => {
        setArticle(e.currentTarget.value)
    }

    const createTag = (e) => {
        const result = e.value.split(' ');
        bodyArtylce.article.tagList = result;
    }

    return (
        <div className={stateFormArticle ?`${newArticle.modal} ${newArticle.active}`:newArticle.modal} onClick={() => setStateArticleForm(false)}>
            <div className={newArticle.modalContent} onClick={e => e.stopPropagation()}>
                <div className={newArticle.container}>
                    <button onClick={() => setStateArticleForm(false)}>X</button>
                    <h2>New Article</h2>
                    <FormikForm onSubmit={createNewArticle}>
                        <label>
                            <p>Article Title</p>
                            <FastField placeholder='Write article title' name='title'/>
                        </label>
                        <label>
                            <p>Description</p>
                            <FastField placeholder='Write about article' name='description'/>
                        </label>
                        <label>
                            <p>Article</p>
                            <FastField placeholder='Write you article' name='body'/>
                        </label>
                        <label>
                            <p>Tag</p>
                            <FastField placeholder='Write tag for article' name='tagList'/>
                        </label>
                        { whatShowFormArticle === 'create'?
                            <input type='submit' value='create'></input>
                            :
                            <input type='submit' value='update'></input>
                        }   
                    </FormikForm>
                </div>
            </div>
        </div>
    );
}

export default withFormik({
    validationSchema: FormSchemaArticle,
    mapPropsToValues: ({ initialValues }) =>
      initialValues ? initialValues : DEFAULT_VALUES,
  })(NewArticle);