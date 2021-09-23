import userAvatar from "./UserAvatar.module.css";
import art from "../../images/art.png"
console.log(art);
const UserAvatar = (props) => {
    return (
        <div className={userAvatar.wrapper}>
            <img src={props.src} width={props.width} height={props.height} className={userAvatar.avatar} alt='avatar'></img>
            <img src={art} className={userAvatar.dotts} alt='dotts'></img>
        </div>
    );
}

export default UserAvatar;