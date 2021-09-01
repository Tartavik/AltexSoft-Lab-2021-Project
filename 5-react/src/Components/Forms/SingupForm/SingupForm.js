import { NavLink } from "react-router-dom";

const SingupForm = (props) => {

    function createNewUser(e) {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        console.log(e.target[2].value);
    }

    return (
        <div>
            <h2>Sing Up</h2>
            <form onSubmit={createNewUser}>
                <label>
                    <p>Username</p>
                    <input placeholder='Write you name'/>
                </label>
                <label>
                    <p>Email</p>
                    <input placeholder='Write you email' type='email'/>
                </label>
                <label>
                    <p>Password</p>
                    <input placeholder='Write you password'/>
                </label>
                <button type='submit'>Sing Up</button>
            </form>
            <p>Already a member?</p><NavLink to='/LogIn'>Log In</NavLink>
        </div>
    );
}

export default SingupForm;