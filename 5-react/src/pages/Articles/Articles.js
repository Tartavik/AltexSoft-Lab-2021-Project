import Post from "../../Components/Post/Post";
import { useEffect, useState } from "react";
import { useUserArticle } from "../UserProfile/hooks/useUserArticle";
import { useArticleComment } from "./hook/useArticleComment";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import Comment from "../../Components/Comment/Comment";
import { useCreateArticleComment } from "./hook/useCreateArticleComment";
import { useDeleteArticleComment } from "./hook/useDeleteArticalComment";
import { useParams } from "react-router";
import { useForm } from "../../context/useAuth";

const Article = (props) => {

    const { slug } = useParams();
    const [isShow, setIsShow] = useState(false);
    const [isShowComm, setIsShowComm] = useState(false);
    const [comment, setComment] = useState('');
    const { fetchArticles, showData } = useUserArticle();
    const { fetchComment, showDataComment } = useArticleComment();
    const { fetchNewComment, showDataNewComment } = useCreateArticleComment();
    const { fetchDeleteComment, showDataDeleteComment } = useDeleteArticleComment();

    const bodyComment = {
        comment: {
          body: comment
        }
    }
    
    useEffect(() => { 
        fetchArticles('/' + slug);
        fetchComment(slug);
    },[])

    useEffect(() => {
        if(showData.data.article !== undefined){
            setIsShow(true);
        }
    }, [showData])

    useEffect(() => {
        if(showDataComment.data.comments !== undefined){
            setIsShowComm(true);
        }
    }, [showDataComment])

    const addPostComment = () => {
        console.log(comment);
        console.log(slug);
        fetchNewComment({
            slug, 
            bodyComment
        }).then(() => {
            fetchComment(slug);
        })
    }

    const deleteArticalComment = (slug,id) => {
        console.log(slug,id);
        fetchDeleteComment({slug,id}).then(() => {
            fetchComment(slug);
        })
    }

    return (
        <div>
            <div>
                { isShow&&<Post flag={props.flag} info={showData.data.article} isShow={false} showBodyorDescrip={false}/>} 
            </div>
            <div>
                { isShow&&
                <div>
                    <div>
                        <UserAvatar src={showData.data.article.author.image} width='35px' height='35px' />
                        <textarea onChange={(e)=> {setComment(e.currentTarget.value)}}></textarea>
                    </div>
                    <button onClick={addPostComment}>Post Comment</button>
                </div>
                }
            </div>
            {
                isShowComm&& Array.from(showDataComment.data.comments).map((comm,index)=>{
                    return <Comment comm={comm} key={index} slug={slug} delete={deleteArticalComment}/>    
                  
                })
            }
            
        </div>
    )
}

export default Article