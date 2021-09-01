import { NavLink } from "react-router-dom";
import { UseLoginForm } from "./hook/UseLoginForm";
import { useState } from "react";

const LoginForm = (props) => {
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmai] = useState('');
    const bodyUser = {
                'user':{
                    'email': userEmail,
                    'password': userPassword
                }
            }

    const checkUser = (e) => {
        e.preventDefault();
        loginUser(bodyUser);
    }

    const changePassword = (e) => {
        setUserPassword(e.currentTarget.value);
    }

    const changeEmail = (e) => {
        setUserEmai(e.currentTarget.value);
    }

    const { loginUser, logUser } = UseLoginForm();

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={checkUser}>
                <label>
                    <p>Email</p>
                    <input onChange={changeEmail} type='email' placeholder='Write you email'/>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={changePassword} placeholder='Write you password'/>
                </label>
                <button type='submit'>Log In</button>
            </form>
            <p>Don’t have an account yet?</p><NavLink to='SingUp'>Create an account</NavLink>
        </div>
    );
}

export default LoginForm;