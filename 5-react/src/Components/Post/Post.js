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
    console.log(props.isShow);
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
    ];

    const getFullDate = () => {
        const month = new Date(date).getMonth() + 1 < 10?'0' + (new Date(date).getMonth() + 1):new Date(date).getMonth() + 1;
        const day = new Date(date).getDate() < 10?'0' + new Date(date).getDate(): new Date(date).getDate();
        const minute = new Date(date).getMinutes() < 10?'0' + new Date(date).getMinutes(): new Date(date).getMinutes();
        const houre = new Date(date).getHours() < 10?'0' + new Date(date).getHours():new Date(date).getHours();
        return `${day}/${month}/${new Date(date).getFullYear()}, ${houre}:${minute}`;
    }

    const dateArticle = getFullDate();
    const { getuserNameProfile } = useAuth();
    const { setShowFormArticle, setFormUpdateArticle, setStateArticleForm, renderItemArticle} = useForm();
    const { dataPostFavorite, fetchPostFavorite } = usePost();
    const { dataPostDeleteFavorite, fetchPostDeleteFavorite } = usePostDelete();
    const { dataDeleteArticle, fetchDeleteArticle} = useDeleteArticle();
    const [like, setLike] = useState(favoritesCount);
    const [isLike, setIsLike] = useState(favorited)
    const bodyArticle = {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
    }

    useEffect(() => {
        if(dataPostFavorite.data.article !== undefined){
            setLike(dataPostFavorite.data.article.favoritesCount);
            setIsLike(dataPostFavorite.data.article.favorited);
        }
    }, [dataPostFavorite])

    useEffect(() => {
        if(dataPostDeleteFavorite.data.article !== undefined){
            setLike(dataPostDeleteFavorite.data.article.favoritesCount);
            setIsLike(dataPostDeleteFavorite.data.article.favorited);
        }
    }, [dataPostDeleteFavorite])

    const changeUser = () => {
        getuserNameProfile(username)
    }

    const showEditForm = () => {
        setShowFormArticle('edit');
        setFormUpdateArticle({
            title,
            description,
            body,
            tagList,
        });        
        setStateArticleForm(true);
    }

    const addFavoritePost = () => {
        if(isLike){
            fetchPostDeleteFavorite(slug);
        }else{  
            fetchPostFavorite(slug);
        }
    }

    const deleteArticle = () => {
        fetchDeleteArticle(slug);
    }

    return (
    <div className={`${post.wrapperPost} ${props.style}`}>
        <div className={post.wrapperHeaderPost}>
            <div className={post.wrapper}>
                <UserAvatar src={image} width='35px' height='35px' />
                <div className={post.wrapperDatePost}>
                    <NavLink to={`/userProfile/${username}`} onClick={changeUser} className={post.userName}>{username}</NavLink>
                    <p className={post.date}>{dateArticle}</p>
                </div>
            </div>
            { props.isShow?(
                <div className={post.btnLike} onClick={addFavoritePost}>
                    <span>{like}</span>
                </div> 
            ):
                <div>
                    <button onClick={showEditForm} className={post.btnEdit}>Edit Article</button>
                    <button onClick={deleteArticle} className={post.btnDelete}>Delete</button>
                </div>
            }
        </div>
        <div className={post.wrapperBodyPost}>
            <h3 className={post.titlePost}>{title}</h3>
            {        
                    props.showBodyorDescrip?
                    <div className={post.description}>{description}</div>
                    :
                    <div className={post.body}>{body}</div>
            }
        </div>
        <div className={post.tag}>{tagList.map((tag) => {
            return `#${tag}, `
        })}</div>

        {
            props.isShow&&<NavLink to={`/article/${slug}`} className={post.readMore} >Read more</NavLink>
        }

    </div>
    )
}

export default Post;