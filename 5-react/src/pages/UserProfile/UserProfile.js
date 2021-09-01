import { useAuth } from "../../context/useAuth";
import PostsContainer from "../PostsContainer/PostsContainer";
import { useUserArticle } from "./hooks/useUserArticle";
import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser"

const UserProfile = (props) => {
   
    const { userNameProfile } = useAuth();
    const [stateNav, setStateNav] = useState('my');
    const { fetchArticles, showData } = useUserArticle();
    const { fetchUser, showDataUser} = useUser();

    useEffect(() => {
        fetchUser(userNameProfile)
        fetchArticles('?activeTab=0&author=' + userNameProfile);      

    }, []);

    useEffect(() => {
        fetchUser(userNameProfile);
        fetchArticles('?activeTab=0&author=' + userNameProfile);    
    },[userNameProfile])

    console.log(showDataUser, showData);

    const myPost = () => {
        if(stateNav === 'favorite'){
            fetchArticles('?activeTab=0&author=' + userNameProfile);
            setStateNav('my');
        }
    }

    const favoritePost = () => {
        if(stateNav === 'my'){
            fetchArticles('?activeTab=1&favorited=' + userNameProfile);
            setStateNav('favorite');
        }
    }
    return (
        <div>
            {
                showDataUser.data.profile !== undefined?(
                <div>
                    <img src={showDataUser.data.profile.image} alt='avatar' width='120px' height='120px'></img>
                    <button>Edit Profile</button>
                    <p>{showDataUser.data.profile.username}</p>
                    <p>{showDataUser.data.profile.bio}</p>
                </div>
                ):(
                    <div></div>
                )
            }
            
            <div>
                <div>
                    <button onClick={myPost}>My Posts</button>
                    <button onClick={favoritePost}>Favorited Posts</button>
                </div>
                <PostsContainer articles={showData.data.articles}/>
            </div>
        </div>
    )
}

export default UserProfile;