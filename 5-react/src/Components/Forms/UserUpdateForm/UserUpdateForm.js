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
                <button>x</button>
                <h2>Profile info</h2>
                <FormikForm onSubmit={updateUserProfile}>
                    <label>
                        <p>Picture</p>
                        <FastField type='text' name='image'/>
                    </label>
                    <ErrorMessage name="image" />
                    <label>
                        <p>Username</p>
                        <FastField type='text' name='username'/>
                    </label>
                    <ErrorMessage name="username" />
                    <label>
                        <p>Biography</p>
                        <FastField type='text' name='bio'/>
                    </label>
                    <ErrorMessage name="bio" />
                    <label>
                        <p>Email</p>
                        <FastField type='text' name='email'/>
                    </label>
                    <ErrorMessage name="email" />
                    <label>
                        <p>Confirm password or enter new</p>
                        <FastField type='text' name='password'/>
                    </label>
                    <ErrorMessage name="password" />
                    <button>Update profile</button>
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