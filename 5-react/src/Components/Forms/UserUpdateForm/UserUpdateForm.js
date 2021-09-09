import { useUpdateForm } from "./hook/useUpdateForm";
import userUpdateForm from "./userUpdateForm.module.css";
import { useForm } from "../../../context/useAuth";
import { FastField, withFormik, Form as FormikForm } from "formik";
import { FormSchemaUpdateProfile } from "../../FormsSchema/FormSchemaUpdateProfile";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const DEFAULT_VALUES = {};

const UserUpdateForm = (props) => {
   
    const { stateEditForm, setstateFormEdit, setFormUpdateUser } = useForm();
    const { errors, isValid, handleSubmit, values } = props;

    const newUserBody = {
        user: {
            email: values.email,
            image: values.image,
            bio: values.bio,
            password: values.password,
            username: values.username,
        }
    }

    const { showDataUpdateUser, updateUser, } = useUpdateForm();

    const updateUserProfile = (e) => {
        e.preventDefault();
        updateUser(newUserBody);
        setFormUpdateUser(newUserBody);
        setstateFormEdit(false)
    }

    return (
        <div className={stateEditForm ?`${userUpdateForm.modal} ${userUpdateForm.active}`:userUpdateForm.modal} onClick={() => setstateFormEdit(false)}>
            <div className={userUpdateForm.modalContent} onClick={e => e.stopPropagation()}>
                <button onClick={() => setstateFormEdit(false)} className={userUpdateForm.btnClose}>x</button>
                <h2>Profile info</h2>
                <FormikForm onSubmit={updateUserProfile}>
                    <label className={ userUpdateForm.wrapperField }>
                        <p className={ userUpdateForm.text }>Picture</p>
                        <FastField type='text' name='image' className={ userUpdateForm.input }/>
                    </label>
                    <ErrorMessage name="image" />
                    <label className={ userUpdateForm.wrapperField }>
                        <p className={ userUpdateForm.text }>Username</p>
                        <FastField type='text' name='username' className={ userUpdateForm.input }/>
                    </label>
                    <ErrorMessage name="username" />
                    <label className={ userUpdateForm.wrapperField }>
                        <p className={ userUpdateForm.text }>Biography</p>
                        <FastField type='text' name='bio' className={ userUpdateForm.input }/>
                    </label>
                    <ErrorMessage name="bio" />
                    <label className={ userUpdateForm.wrapperField }>
                        <p className={ userUpdateForm.text }>Email</p>
                        <FastField type='text' name='email' className={ userUpdateForm.input }/>
                    </label>
                    <ErrorMessage name="email" />
                    <label className={ userUpdateForm.wrapperField }>
                        <p className={ userUpdateForm.text }>Confirm password or enter new</p>
                        <FastField type='text' name='password' className={ userUpdateForm.input }/>
                    </label>
                    <ErrorMessage name="password" />
                    <button className={userUpdateForm.btn}>Update profile</button>
                </FormikForm>
            </div>
        </div>
    )
}

export default withFormik({
    validationSchema: FormSchemaUpdateProfile,
    enableReinitialize: true,
    mapPropsToValues: ({ initialValues }) =>
      initialValues ? initialValues : DEFAULT_VALUES,
  })(UserUpdateForm);