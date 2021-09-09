import * as yup from "yup";

const commonErrorMessages = {
    usernameRequired: "User name is required!",
    emailRequired: "Email is required!",
    passwordRequired: "Password is required!",
    emailNotValid: "Email is not valid!",
    passwordMinLength: "Password should be at least 8 characters!",
  };
  
  export const FormSchemaUpdateProfile = yup.object().shape({
    image: yup
        .string()
        .trim(),
    username: yup
        .string()
        .trim()
        .required(() => commonErrorMessages.descriptionRequired),
    bio: yup
        .string()
        .trim(),
    email: yup
        .string()
        .trim()
        .email(() => commonErrorMessages.emailNotValid)
        .required(() => commonErrorMessages.titleRequired),
    password: yup
        .string()
        .trim()
        .required(() => commonErrorMessages.titleRequired)
        .min(8, () => commonErrorMessages.passwordMinLength),
  });