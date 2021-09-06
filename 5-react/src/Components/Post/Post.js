import post from "./Post.module.css";
import UserAvatar from "../UserAvatar/UserAvatar"
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";

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

    const changeUser = () => {
        getuserNameProfile(username)
    }

    const showEditForm = () => {
        props.setTypeModalWindow('edit');
        props.setBodyArticalUpdate({
            article: {
                title,
                description,
                body,
                tagList,
            }
        });
        props.setStateModal(true);
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
                <button className={post.btnLike}>{props.info.favoritesCount}</button>
                :
                <div>
                    <button onClick={showEditForm}>Edit Article</button>
                    <button>Delete</button>
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
            props.isShow&&<NavLink to='/article' onClick={() => props.slug(props.info.slug)}>Read more</NavLink>
        }

    </div>
    )
}

export default Post;