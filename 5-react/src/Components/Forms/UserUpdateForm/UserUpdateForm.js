import { useState, useEffect } from "react";
import { useUpdateForm } from "./hook/useUpdateForm";
import userUpdateForm from "./userUpdateForm.module.css";
import { useForm } from "../../../context/useAuth";
import { NavLink } from "react-router-dom";

const UserUpdateForm = () => {
   
    const { formUpdate, stateEditForm, setstateFormEdit, setFormUpdateUser } = useForm();
    console.log(formUpdate);

    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if(formUpdate !== undefined){
            setImage(formUpdate.image);
            setBio(formUpdate.bio);
            setEmail(formUpdate.email);
            setUsername(formUpdate.username);
        }
    }, [formUpdate])

    console.log(image,bio,email,password,username);
    const newUserBody = {
        user: {
            email,
            image,
            bio,
            password,
            username
        }
    }

    const { showDataUpdateUser, updateUser, } = useUpdateForm();
    console.log(showDataUpdateUser);

    const updateUserProfile = (e) => {
        updateUser(newUserBody);
        setFormUpdateUser(newUserBody);
        setstateFormEdit(false)
    }

    return (
        <div className={stateEditForm ?`${userUpdateForm.modal} ${userUpdateForm.active}`:userUpdateForm.modal} onClick={() => setstateFormEdit(false)}>
            <div className={userUpdateForm.modalContent} onClick={e => e.stopPropagation()}>
                <button>x</button>
                <h2>Profile info</h2>
                <form onSubmit={updateUserProfile}>
                    <label>
                        <p>Picture</p>
                        <input type='text' value={image} onChange={(e) => setImage(e.currentTarget.value)}/>
                    </label>
                    <label>
                        <p>Username</p>
                        <input type='text' value={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
                    </label>
                    <label>
                        <p>Biography</p>
                        <input type='text' value={bio} onChange={(e) => setBio(e.currentTarget.value)}/>
                    </label>
                    <label>
                        <p>Email</p>
                        <input type='text' value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </label>
                    <label>
                        <p>Confirm password or enter new</p>
                        <input type='text' value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </label>
                    <button>Update profile</button>
                </form>
            </div>
        </div>
    )
}

export default UserUpdateForm;