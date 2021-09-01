import Post from "../Post/Post";
const MyFeeds = (props) => {
    return (
    <div>
        {props.articles.map((elem,index) => {
                return <Post key={index} info={elem}/>
            })}
            
    </div>
    )
}

export default MyFeeds;