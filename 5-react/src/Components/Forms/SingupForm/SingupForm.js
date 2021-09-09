import { NavLink } from "react-router-dom";
import { useSingupForm } from "./hook/useSingupForm";
import { FastField, withFormik, Form as FormikForm } from "formik";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { FormSchemaSingUp } from "../../FormsSchema/FormSchemaSingUp";
import singupForm from "./singupForm.module.css";

const DEFAULT_VALUES = {
    username: "",
    email: "",
    password: "",
  };

const SingupForm = (props) => {

    const { handleSubmit, values } = props;

    const bodyUser = {
            'user':{
                'email': values.email,
                'password': values.password,
                'username': values.username,
            }
    }

    const registerNewUser = (e) => {
        e.preventDefault();
        handleSubmit();
        regUser(bodyUser)
    }

    const { regUser } = useSingupForm();

    return (
        <div className={singupForm.wrapper}>
            <h2>Sing Up</h2>
            <FormikForm onSubmit={registerNewUser}>
                <label className={ singupForm.wrapperField }>
                    <p className={singupForm.text}>Username</p>
                    <FastField type='text' className={ singupForm.input } name='username' placeholder='Write you name'/>
                </label>
                <ErrorMessage name="username" />
                <label className={ singupForm.wrapperField }>
                    <p className={singupForm.text}>Email</p>
                    <FastField type='text' className={ singupForm.input } name='email' placeholder='Write you email' />
                </label>
                <ErrorMessage name="email" />
                <label className={ singupForm.wrapperField }>
                    <p className={singupForm.text}>Password</p>
                    <FastField type='text' className={ singupForm.input } name='password' placeholder='Write you password'/>
                </label>
                <ErrorMessage name="password" />
                <button type='submit' className={singupForm.btn}>Sing Up</button>
            </FormikForm>
            <div className={singupForm.footerLoginForm}>
                <p className={singupForm.footerText}>Already a member?</p><NavLink to='/LogIn' className={singupForm.link}>Log In</NavLink>
            </div>  
        </div>
    );
}

export default withFormik({
    validationSchema: FormSchemaSingUp,
    mapPropsToValues: ({ initialValues }) =>
      initialValues ? initialValues : DEFAULT_VALUES,
  })(SingupForm);