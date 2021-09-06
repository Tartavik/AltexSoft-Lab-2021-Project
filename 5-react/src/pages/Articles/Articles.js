import Post from "../../Components/Post/Post";
import { useEffect, useState } from "react";
import { useUserArticle } from "../UserProfile/hooks/useUserArticle";
import { useArticleComment } from "./hook/useArticleComment";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import Comment from "../../Components/Comment/Comment";
import { useCreateArticleComment } from "./hook/useCreateArticleComment";
import { useDeleteArticleComment } from "./hook/useDeleteArticalComment";

const Article = (props) => {
    const [isShow, setIsShow] = useState(false);
    const [isShowComm, setIsShowComm] = useState(false);
    const [comment, setComment] = useState('');
    const articleSlug = props.slug;
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
        if(articleSlug !== undefined){
            fetchArticles('/' + articleSlug).then(() => {
                setIsShow(true);
            });
            fetchComment(articleSlug).then(() => {
                setIsShowComm(true)
            })
        }
    },[])

    const addPostComment = () => {
        console.log(comment);
        fetchNewComment({
            articleSlug, 
            bodyComment
        }).then(() => {
            fetchComment(articleSlug);
        })
    }

    const deleteArticalComment = (slug,id) => {
        console.log(slug,id);
        fetchDeleteComment({slug,id}).then(() => {
            fetchComment(articleSlug);
        })
    }

    return (
        <div>
            <div>
                { isShow&&<Post info={showData.data.article} isShow={false} setTypeModalWindow={props.setTypeModalWindow} setBodyArticalUpdate={props.setBodyArticalUpdate} setStateModal={props.setStateModal} showBodyorDescrip={false}/>} 
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
                    return <Comment comm={comm} key={index} articleSlug={articleSlug} delete={deleteArticalComment}/>    
                  
                })
            }
            
        </div>
    )
}

export default Article