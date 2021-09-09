import { NavLink } from "react-router-dom";
import UserAvatar from "../../UserAvatar/UserAvatar";
import header from "./Header.module.css";
import DrobDown from "../../DrobDown/DrobDown";
import { useState } from 'react';
import { useAuth } from "../../../context/useAuth";
import logo from "./../../../images/logo.png"

console.log(logo);
const Header = () => {

    const { isSignedIn, user } = useAuth();

    const [stateDrobDown, setStateDrobDown] = useState(false);

    const changeStateDrobDown = () => {
        setStateDrobDown(!stateDrobDown)
    }

    return (
        <header className={header.header}>
            <image src={ logo } className='logo'></image>
            <div className={header.wrapperNav}>
                <NavLink to='/' className={`${header.btn}`}>Home</NavLink>
                {
                    isSignedIn ? (
                        <div onClick={changeStateDrobDown}>
                            <UserAvatar src={user !== undefined?user.image:'#'} width='50px' height='50px'/>
                            {stateDrobDown&&<DrobDown />}
                        </div>    
                    ):(
                        <ul className={header.wrapperButton}>
                            <li className={header.list}>
                                <NavLink to='/logIn' className={header.btn}>Log in</NavLink>
                            </li>
                            <li className={header.list}>
                                <NavLink to='/singUp' className={header.btn}>Sing up</NavLink>
                            </li>
                        </ul>
                    )
                }
            </div>
        </header>
    );
}

export default Header;