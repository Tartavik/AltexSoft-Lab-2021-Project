import { NavLink } from "react-router-dom";
import drobDown from "./DrobDown.module.css" 
import { useAuth } from "../../context/useAuth";
const DrobDown = (props) => {

    const logOut = () => {
        localStorage.removeItem('token');
        singOut();
        getToken('');
        getUser('');
    }
    const { singOut, getToken, getUser, getuserNameProfile, user } = useAuth();

    const changeUserProfile = () => {
        getuserNameProfile(user.username)
    }


    return (
        <div>
            <ul className={drobDown.wrapperNav}>
                <li className={drobDown.nav}>
                    <NavLink to='/userProfile' onClick={changeUserProfile}>User Profile</NavLink>
                </li>
                <li className={drobDown.nav}>
                    <NavLink to='/newArticle'>New Article</NavLink>
                </li>
                <li className={drobDown.nav}>
                    <button onClick={logOut}>Log Out</button>
                </li>
            </ul>

        </div>
    );
}

export default DrobDown;