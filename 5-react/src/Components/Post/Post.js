const Post = (props) => {
    console.log(props);
    return (
    <div>
        <div>
            <img src={props.info.author.image} alt='avatar'></img>
            <div>
                <p>{props.info.author.username}</p>
                <p>{props.info.createdAt}</p>
            </div>
            <div>`Like ${props.info.favoritesCount}`</div>
        </div>
        <div>
            <h3>{props.info.title}</h3>
            <div>{props.info.description}</div>
        </div>
        <p>Read more</p>
    </div>
    )
}

export default Post;