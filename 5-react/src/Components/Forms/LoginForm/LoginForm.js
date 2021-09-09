import { NavLink } from "react-router-dom";
import { UseLoginForm } from "./hook/UseLoginForm";
import { FastField, withFormik, Form as FormikForm } from "formik";
import { FormSchemaLogin } from '../../FormsSchema/FormSchemaLogin';
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import loginForm from "./loginForm.module.css";


const DEFAULT_VALUES = {
    email: "",
    password: "",
  };

const LoginForm = (props) => {

    const { handleSubmit, values } = props;
    const bodyUser = {
                'user':{
                    'email': values.email,
                    'password': values.password,
                }
            }

    const checkUser = (e) => {
        e.preventDefault();
        handleSubmit();
        loginUser(bodyUser);
    }

    const { loginUser } = UseLoginForm();

    return (
        <div className={loginForm.wrapper}>
            <h2>Log In</h2>
            <FormikForm onSubmit={ checkUser }>
                <label className={ loginForm.wrapperField }>
                    <p className={ loginForm.text }>Email</p>
                    <FastField name='email' type='text' placeholder='Write you email' className={ loginForm.input }/>
                    <ErrorMessage name="email" />
                </label>
                
                <label className={ loginForm.wrapperField }>
                    <p className={ loginForm.text }>Password</p>
                    <FastField  name='password' type='text' placeholder='Write you password' className={ loginForm.input }/>
                    <ErrorMessage name="password" />
                </label>
                <button type='submit' className={ loginForm.btn }>Log In</button>
            </FormikForm>
            <div className={loginForm.footerLoginForm}>
                <p className={loginForm.footerText}>Don’t have an account yet?</p><NavLink to='SingUp' className={loginForm.link}>Create an account</NavLink>   
            </div>
            
        </div>
    );
}

export default  withFormik({
    validationSchema: FormSchemaLogin,
    mapPropsToValues: ({ initialValues }) =>
      initialValues ? initialValues : DEFAULT_VALUES,
  })(LoginForm);