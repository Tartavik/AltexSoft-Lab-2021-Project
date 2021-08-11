import { NavLink } from "react-router-dom";
import actionButtons from "./ActionButtons.module.css";
import CurrentUser from "../CurrentUser/CurrentUser";

const ActionButtons = (props) => {

    return (
        <div className={actionButtons.wrapperButton}>
            <NavLink to='Content' className={actionButtons.btn}>Home</NavLink>
            <CurrentUser />
            <NavLink to='LogIn' className={actionButtons.btn}>Log in</NavLink>
            <NavLink to='SingUp' className={actionButtons.btn}>Sing up</NavLink>
        </div>
    );
}

export default ActionButtons;