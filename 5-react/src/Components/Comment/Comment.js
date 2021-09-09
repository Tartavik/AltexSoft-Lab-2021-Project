import UserAvatar from "../UserAvatar/UserAvatar"

const Comment = (props) => {
    const [slug, id] = [props.slug, props.comm.id];
    console.log(props);
    console.log(slug);
    return (
        <div>
            <div>
                <div>
                    <div>
                        <UserAvatar src={props.comm.author.image} width='35px' height='35px' />
                    <div>
                    </div>
                        <p>{props.comm.author.username}</p>
                        <p>{props.comm.createdAt}</p>
                    </div>
                </div>
                <button onClick={() => { props.delete(slug,id)}}>Delete</button>
            </div>
            <div>
                {props.comm.body}
            </div>
        </div>
    )
}

export default Comment