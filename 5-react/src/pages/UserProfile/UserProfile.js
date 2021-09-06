import { useAuth, useForm } from "../../context/useAuth";
import { useUserArticle } from "./hooks/useUserArticle";
import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import { useParams } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Post from "../../Components/Post/Post";

const UserProfile = (props) => {

    const { username } = useParams();
    const { user } = useAuth();
    const { fetchArticles, showData } = useUserArticle();
    const { fetchUser, showDataUser} = useUser();
    const { setstateFormEdit, setFormUpdateUser } = useForm();
    const [currentIndex, setCurrentIndex] = useState(1);
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


    return (
        <div>
            {
                showDataUser.data.profile !== undefined?(
                <div>
                    <img src={showDataUser.data.profile.image} alt='avatar' width='120px' height='120px'></img>
                    <p>{showDataUser.data.profile.username}</p>
                    <p>{showDataUser.data.profile.bio}</p>
                    {
                        user.username === username?
                        <button onClick={(e) =>{ 
                            e.preventDefault();
                            console.log(user);
                            setFormUpdateUser(user);
                            setstateFormEdit(true)
                        }}>
                            Edit Profile
                        </button>
                        :
                        <button>Follow</button>
                    }
                </div>
                ):(
                    <div></div>
                )
            }
            <Tabs onSelect={onChangeTabs} selectedIndex={currentIndex}>
                <TabList>
                    <Tab onClick={myPost}>My Posts</Tab>
                    <Tab onClick={favoritePost}>Favorited Posts</Tab>
                </TabList>
                <TabPanel>
                    2
                </TabPanel>
                <TabPanel>
                    {showData.data.articles !== undefined?showData.data.articles.map((elem,index) => {
                        return <Post key={index} info={elem} isShow={true} showBodyorDescrip={true}/>
                    }):
                    <div></div>
                    }

                </TabPanel>
            </Tabs>

        </div>
    )
}

export default UserProfile;