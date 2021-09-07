import post from "./Post.module.css";
import UserAvatar from "../UserAvatar/UserAvatar"
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";
import { useForm } from "../../context/useAuth";
import { usePost } from "./hook/usePost";
import { usePostDelete } from "./hook/usePostDelete";
import { useState, useEffect } from "react";
import { useDeleteArticle } from "./hook/useDeleteArticle";

const Post = (props) => {
    const [image, username, date, title, description, tagList, favorited, favoritesCount, slug, updatedAt, body] = 
    [
        props.info.author.image,
        props.info.author.username,
        props.info.createdAt,
        props.info.title,
        props.info.description,
        props.info.tagList,
        props.info.favorited,
        props.info.favoritesCount,
        props.info.slug,
        props.info.updatedAt,
        props.info.body,
    ]

    const { getuserNameProfile } = useAuth();
    const { setShowFormArticle, setFormUpdateArticle, setStateArticleForm} = useForm();
    const { dataPostFavorite, fetchPostFavorite } = usePost();
    const { dataPostDeleteFavorite, fetchPostDeleteFavorite } = usePostDelete();
    const { dataDeleteArticle, fetchDeleteArticle} = useDeleteArticle();
    const [like, setLike] = useState(favoritesCount);
    console.log(dataDeleteArticle);
    useEffect(() => {
        if(dataPostFavorite.data.article !== undefined){
            setLike(dataPostFavorite.data.article.favoritesCount)
        }
    }, [dataPostFavorite])

    const changeUser = () => {
        getuserNameProfile(username)
    }

    const showEditForm = () => {
        setShowFormArticle('edit');
        setFormUpdateArticle({
            article: {
                title,
                description,
                body,
                tagList,
            }
        });
        setStateArticleForm(true);
    }

    const addFavoritePost = () => {
        if(favorited){
            fetchPostDeleteFavorite(slug);
        }else{  
            fetchPostFavorite(slug);
        }
    }

    const deleteArticle = () => {
        fetchDeleteArticle(slug);
    }

    return (
    <div className={post.wrapperPost}>
        <div className={post.wrapperHeaderPost}>
            <div className={post.wrapper}>
                <UserAvatar src={image} width='35px' height='35px' />
                <div className={post.wrapperDatePost}>
                    <NavLink to={`/userProfile/${username}`} onClick={changeUser}>{username}</NavLink>
                    <p>{date}</p>
                </div>
            </div>
            { props.isShow?
                <button className={post.btnLike} onClick={addFavoritePost}>{like}</button>
                :
                <div>
                    <button onClick={showEditForm}>Edit Article</button>
                    <button onClick={deleteArticle}>Delete</button>
                </div>
            }
        </div>
        <div className={post.wrapperBodyPost}>
            <h3 className={post.titlePost}>{title}</h3>
            {        
                    props.showBodyorDescrip?
                    <div>{description}</div>
                    :
                    <div>{body}</div>
            }
        </div>
        <div>{tagList}</div>

        {
            props.isShow&&<NavLink to={`/article/${slug}`}>Read more</NavLink>
        }

    </div>
    )
}

export default Post;