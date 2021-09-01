import post from "./Post.module.css";
import UserAvatar from "../UserAvatar/UserAvatar"
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";

const Post = (props) => {
    const [image, username, date, title, description] = 
    [
        props.info.author.image,
        props.info.author.username,
        props.info.createdAt,
        props.info.title,
        props.info.description
    ]

    const { getuserNameProfile } = useAuth();

    const changeUser = () => {
        getuserNameProfile(username)
    }

    return (
    <div className={post.wrapperPost}>
        <div className={post.wrapperHeaderPost}>
            <div className={post.wrapper}>
                <UserAvatar src={image} width='35px' height='35px' />
                <div className={post.wrapperDatePost}>
                    <NavLink to ='/userProfile' onClick={changeUser}>{username}</NavLink>
                    <p>{date}</p>
                </div>
            </div>
            <button className={post.btnLike}>{props.info.favoritesCount}</button>
        </div>
        <div className={post.wrapperBodyPost}>
            <h3 className={post.titlePost}>{title}</h3>
            <div>{description}</div>
        </div>
        <button>Read more</button>
    </div>
    )
}

export default Post;