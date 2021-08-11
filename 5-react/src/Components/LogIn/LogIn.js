import { NavLink } from "react-router-dom";
import axios from 'axios';

const checkUser = (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    return axios.post('https://conduit.productionready.io/api/users/login', { "user":{
        "email": e.target[0].value,
        "password": e.target[1].value
        } })
        .then(res => {
            console.log(res.data);
        })
}

const LogIn = (props) => {

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={checkUser}>
                <label>
                    <p>Email</p>
                    <input type='email' placeholder='Write you email'/>
                </label>
                <label>
                    <p>Password</p>
                    <input placeholder='Write you password'/>
                </label>
                <NavLink to='Content' type='submit'>Log In</NavLink>
            </form>
            <p>Don’t have an account yet?</p><NavLink to='SingUp'>Create an account</NavLink>
        </div>
    );
}

export default LogIn;