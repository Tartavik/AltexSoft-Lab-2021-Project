import Post from "../../Components/Post/Post";

const PostsContainer = (props) => {
    const isShow = props.articles === undefined?false:true;

    return (
        <div>
            {isShow&&props.articles.map((elem,index) => {
                    return <Post key={index} info={elem}/>
                })}    
        </div>
    )
}

export default PostsContainer;