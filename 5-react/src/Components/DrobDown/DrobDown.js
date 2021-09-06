import { NavLink } from "react-router-dom";
import drobDown from "./DrobDown.module.css" 
import { useAuth } from "../../context/useAuth";

const DrobDown = (props) => {
console.log(props);
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

    const openCreateFormArtical = () => {
        props.setStateModal(true);
        props.setTypeModalWindow('create');
    }
 

    return (
        <div>
            <ul className={drobDown.wrapperNav}>
                <li className={drobDown.nav}>
                    <NavLink to={`/userProfile/${user.username}`} onClick={changeUserProfile}>User Profile</NavLink>
                </li>
                <li className={drobDown.nav}>
                    <button onClick={openCreateFormArtical}>New Article</button>
                </li>
                <li className={drobDown.nav}>
                    <button onClick={logOut}>Log Out</button>
                </li>
            </ul>

        </div>
    );
}

export default DrobDown;