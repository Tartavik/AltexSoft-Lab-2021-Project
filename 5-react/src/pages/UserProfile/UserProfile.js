import { useAuth, useForm } from "../../context/useAuth";
import { useUserArticle } from "./hooks/useUserArticle";
import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import { useParams } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Post from "../../Components/Post/Post";
import { useLocation } from "react-router";
import userProfile from "./userProfile.module.css"

const UserProfile = (props) => {
    const { username } = useParams();
    const { user } = useAuth();
    const { fetchArticles, showData } = useUserArticle();
    const { fetchUser, showDataUser} = useUser();
    const { setstateFormEdit, setFormUpdateUser } = useForm();
    const [currentIndex, setCurrentIndex] = useState(0);
    const location = useLocation().pathname.slice(13);

    const onChangeTabs = (e) => {
        setCurrentIndex(e)
    }

    useEffect(() => {
        fetchUser(username);         
        fetchArticles('?activeTab=0&author=' + username);
    },[username])

    const myPost = () => {
            fetchArticles('?activeTab=0&author=' + username);
    }

    const favoritePost = () => {
            fetchArticles('?activeTab=1&favorited=' + username);
    }
    console.log(showDataUser.data.profile);

    const editProfile = (e) => {
        e.preventDefault();
        const bodyUser = {
            image: user.image,
            username: user.username,
            bio: user.bio,
            email: user.email,
            password: user.password,
        }
        setFormUpdateUser(bodyUser);
        setstateFormEdit(true);
    }

  

    return (
        <div>
            {
                showDataUser.data.profile !== undefined?(
                <div className={userProfile.wrapperProfile}>
                    <img src={showDataUser.data.profile.image} alt='avatar' width='120px' height='120px'></img>
                    <div className={userProfile.wrapperInfoUser}>
                        <p className={userProfile.name}>My name is {showDataUser.data.profile.username}</p>
                        <p className={userProfile.bio}>A few words about me: {showDataUser.data.profile.bio}</p>
                        {
                            user.username === location?
                            <button onClick={editProfile} className={userProfile.btnEdit}>
                                Edit Profile
                            </button>
                            :
                            <button>Follow</button>
                        }
                    </div>
                </div>
                ):(
                    <div></div>
                )
            }
            <Tabs onSelect={onChangeTabs} selectedIndex={currentIndex} className={userProfile.wrapperArticle}>
                <TabList className={userProfile.nav}>
                    <Tab onClick={myPost} className={currentIndex === 0 ?`${userProfile.active} ${userProfile.tab}`:userProfile.tab}>My Posts</Tab>
                    <Tab onClick={favoritePost} className={currentIndex === 1 ?`${userProfile.active} ${userProfile.tab}`:userProfile.tab}>Favorited Posts</Tab>
                </TabList>
                <TabPanel>
                    {showData.data.articles !== undefined?showData.data.articles.map((elem,index) => {
                        return <Post key={index} info={elem} isShow={true} showBodyorDescrip={true} q='q'/>
                    }):
                    <div></div>
                    }
                </TabPanel>
                <TabPanel>
                    {showData.data.articles !== undefined?showData.data.articles.map((elem,index) => {
                        return <Post key={index} info={elem} isShow={true} showBodyorDescrip={true} q='q'/>
                    }):
                    <div></div>
                    }

                </TabPanel>
            </Tabs>

        </div>
    )
}

export default UserProfile;