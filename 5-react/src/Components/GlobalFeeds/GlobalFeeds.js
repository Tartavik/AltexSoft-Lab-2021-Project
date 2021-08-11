import Post from '../Post/Post';
const GlobalFeeds = (props) => {
    console.log(props.articles);
    return (
        <div>
            {props.articles.map((elem,index) => {
                console.log('1');
                return <Post id={index} info={elem}/>
            })}
            1
        </div>
    )
}

export default GlobalFeeds;