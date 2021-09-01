import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSingupForm } from "./hook/useSingupForm";

const SingupForm = (props) => {

    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmai] = useState('');
    const [userName, setUserName] = useState('');
    const bodyUser = {
            'user':{
                'email': userEmail,
                'password': userPassword,
                'username': userName,
            }
    }

    function createNewUser(e) {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        console.log(e.target[2].value);
    }

    const changeName = (e) => {
        setUserName(e.currentTarget.value);
    }

    const changeEmail = (e) => {
        setUserEmai(e.currentTarget.value);
    }

    const changePassword = (e) => {
        setUserPassword(e.currentTarget.value);
    }

    const registerNewUser = (e) => {
        e.preventDefault();
        regUser(bodyUser)
    }

    const { regUser, showDataReg } = useSingupForm();

    console.log(showDataReg, regUser);
    return (
        <div>
            <h2>Sing Up</h2>
            <form onSubmit={createNewUser}>
                <label>
                    <p>Username</p>
                    <input onChange={changeName} placeholder='Write you name'/>
                </label>
                <label>
                    <p>Email</p>
                    <input onChange={changeEmail} placeholder='Write you email' type='email'/>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={changePassword} placeholder='Write you password'/>
                </label>
                <button type='submit' onClick={registerNewUser}>Sing Up</button>
            </form>
            <p>Already a member?</p><NavLink to='/LogIn'>Log In</NavLink>
        </div>
    );
}

export default SingupForm;