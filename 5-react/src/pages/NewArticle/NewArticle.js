import newArticle from "./newArticle.module.css";
import { useCreateArticle } from "./useCreateArticle";
import { useForm } from "../../context/useAuth";
import { FastField, withFormik, Form as FormikForm } from "formik";
import { FormSchemaArticle } from "../../Components/FormsSchema/FormSchemaArticle";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const DEFAULT_VALUES = {};

const NewArticle = (props) => {
    console.log(props);

    const { showDataArticle, fetchArticle } = useCreateArticle();
    const { whatShowFormArticle, stateFormArticle, setStateArticleForm} = useForm();

    const { values } = props;

    const bodyArtylce = {
        article: {
            title: values.title,
            description: values.description,
            body: values.body,
            tagList: []
          }
    }

    const createNewArticle = (e) => {
        e.preventDefault();
        createTag(values.tagList);
        setStateArticleForm(false);
        fetchArticle(bodyArtylce);
    }

    const createTag = (e) => {
        const result = e.split(' ');
        bodyArtylce.article.tagList = result;
    }

    return (
        <div className={stateFormArticle ?`${newArticle.modal} ${newArticle.active}`:newArticle.modal} onClick={() => setStateArticleForm(false)}>
            <div className={newArticle.modalContent} onClick={e => e.stopPropagation()}>
                <div className={newArticle.container}>
                    <button onClick={() => setStateArticleForm(false)} className={newArticle.btnClose}>X</button>
                    <h2>New Article</h2>
                    <FormikForm onSubmit={createNewArticle}>
                        <label className={ newArticle.wrapperField }>
                            <p className={ newArticle.text }>Article Title</p>
                            <FastField placeholder='Write article title' name='title' className={ newArticle.input }/>
                        </label>
                        <ErrorMessage name="title" />
                        <label className={ newArticle.wrapperField }>
                            <p className={ newArticle.text }>Description</p>
                            <FastField placeholder='Write about article' name='description' className={ newArticle.input }/>
                        </label>
                        <ErrorMessage name="description" />
                        <label className={ newArticle.wrapperField }>
                            <p className={ newArticle.text }>Article</p>
                            <FastField placeholder='Write you article' name='body' className={ newArticle.input }/>
                        </label>
                        <ErrorMessage name="body" />
                        <label className={ newArticle.wrapperField }>
                            <p className={ newArticle.text }>Tag</p>
                            <FastField placeholder='Write tag for article' name='tagList' className={ newArticle.input }/>
                        </label>
                        { whatShowFormArticle === 'create'?
                            <input type='submit' value='Create' className={newArticle.btn}></input>
                            :
                            <input type='submit' value='Update' className={newArticle.btn}></input>
                        }   
                    </FormikForm>
                </div>
            </div>
        </div>
    );
}

export default withFormik({
    validationSchema: FormSchemaArticle,
    enableReinitialize: true,
    mapPropsToValues: ({ initialValues }) =>
      initialValues ? initialValues : DEFAULT_VALUES,
  })(NewArticle);