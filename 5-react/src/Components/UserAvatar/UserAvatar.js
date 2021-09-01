
const UserAvatar = (props) => {
    return (
        <div>
            <img src={props.src} width={props.width} height={props.height} alt='avatar'></img>
        </div>
    );
}

export default UserAvatar;