import Post from '../Post/Post';

const GlobalFeeds = (props) => {
    return (
        <div>
            {props.articles.map((elem,index) => {
                return <Post key={index} info={elem}/>
            })}
            2
        </div>
    )
}

export default GlobalFeeds;