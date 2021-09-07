import newArticle from "./newArticle.module.css";
import { useCreateArticle } from "./useCreateArticle";
import { useEffect, useState } from "react";
import { useForm } from "../../context/useAuth";


const NewArticle = () => {

    const { showDataArticle, fetchArticle } = useCreateArticle();
    const { whatShowFormArticle, valueFormUpdateArticle, stateFormArticle, setStateArticleForm} = useForm();
   
    const [articleTitlte, setArticleTitle ] = useState('');
    const [article, setArticle ] = useState('');
    const [description, setDescription ] = useState('');
    const [tagList, setTagList] = useState('');
    console.log(1,'newArtical', whatShowFormArticle);
    const bodyArtylce = {
        article: {
            title: articleTitlte,
            description: description,
            body: article,
            tagList: []
          }
    }

    useEffect(()=>{
        if(valueFormUpdateArticle !== undefined){
            if(whatShowFormArticle === 'edit'){
                setArticleTitle(valueFormUpdateArticle.article.title);
                setArticle(valueFormUpdateArticle.article.body);
                setDescription(valueFormUpdateArticle.article.description);
                setTagList(valueFormUpdateArticle.article.tagList);
            }
        }
    },[valueFormUpdateArticle]);

    


    const createNewArticle = (e) => {
        e.preventDefault();
        createTag(e.target[3]);
        setStateArticleForm(false);
        fetchArticle(bodyArtylce);
        setArticleTitle('');
        setArticle('');
        setDescription('');
        setTagList('');
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
                    <form onSubmit={createNewArticle}>
                        <label>
                            <p>Article Title</p>
                            <input placeholder='Write article title' value={articleTitlte} onChange={changeArticleTitle}/>
                        </label>
                        <label>
                            <p>Description</p>
                            <input placeholder='Write about article' value={description} onChange={changeDescription}/>
                        </label>
                        <label>
                            <p>Article</p>
                            <input placeholder='Write you article' value={article} onChange={changeArticle}/>
                        </label>
                        <label>
                            <p>Tag</p>
                            <input placeholder='Write tag for article' value={tagList} />
                        </label>
                        { whatShowFormArticle === 'create'?
                            <input type='submit' value='create'></input>
                            :
                            <input type='submit' value='update'></input>
                        }   
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewArticle;