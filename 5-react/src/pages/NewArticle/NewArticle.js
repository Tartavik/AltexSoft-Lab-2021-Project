import newArticle from "./newArticle.module.css";
import { useCreateArticle } from "./useCreateArticle";
import { useState } from "react";


const NewArticle = ({state, setState, typeModal, bodyArticalUpdate}) => {
   
    const [articleTitlte, setArticleTitle ] = useState(bodyArticalUpdate !== false?bodyArticalUpdate.article.title:'');
    const [article, setArticle ] = useState(bodyArticalUpdate !== false?bodyArticalUpdate.article.body:'');
    const [description, setDescription ] = useState(bodyArticalUpdate !== false?bodyArticalUpdate.article.description:'');
    const [tagList, setTagList] = useState(bodyArticalUpdate !== false?bodyArticalUpdate.article.tagList:'');
    console.log(bodyArticalUpdate, articleTitlte, article, description );
    const bodyArtylce = {
        article: {
            title: articleTitlte,
            description: description,
            body: article,
            tagList: []
          }
    }

    const { showDataArticle, fetchArticle } = useCreateArticle();

    const createNewArticle = (e) => {
        e.preventDefault();
        createTag(e.target[3]);
        setState(false);
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
        <div className={state ?`${newArticle.modal} ${newArticle.active}`:newArticle.modal} onClick={() => setState(false)}>
            <div className={newArticle.modalContent} onClick={e => e.stopPropagation()}>
                <div className={newArticle.container}>
                    <button onClick={() => setState(false)}>X</button>
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
                        { typeModal === 'create'?
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