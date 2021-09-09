import { NavLink } from "react-router-dom";
import drobDown from "./DrobDown.module.css" 
import { useAuth } from "../../context/useAuth";
import { useForm } from "../../context/useAuth";

const DrobDown = (props) => {

    const logOut = () => {
        localStorage.removeItem('token');
        singOut();
        getToken('');
        getUser('');
    }
    const { singOut, getToken, getUser, getuserNameProfile, user } = useAuth();
    const { setShowFormArticle, setStateArticleForm, setFormUpdateArticle } = useForm();

    const changeUserProfile = () => {
        getuserNameProfile(user.username)
    }

    const openCreateFormArtical = () => {
        setStateArticleForm(true);
        setShowFormArticle('create');
        setFormUpdateArticle({
            article: {
                title: '',
                description: '',
                body: '',
                tagList: '',
            }
        });
    }
 

    return (
        <div>
            <ul className={drobDown.wrapperNav}>
                <li className={drobDown.nav}>
                    <NavLink to={`/userProfile/${user.username}`} onClick={changeUserProfile} className={drobDown.btn}>User Profile</NavLink>
                </li>
                <li className={`${drobDown.nav} ${drobDown.line}`}>
                    <button onClick={openCreateFormArtical} className={drobDown.btn}>New Article</button>
                </li>
                <li className={drobDown.nav}>
                    <button onClick={logOut} className={drobDown.btn}>Log Out</button>
                </li>
            </ul>

        </div>
    );
}

export default DrobDown;