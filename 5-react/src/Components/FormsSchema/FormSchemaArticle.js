import * as yup from "yup";

const commonErrorMessages = {
    emailNotValid: "Email is not valid!",
    emailRequired: "Email is required!",
    passwordRequired: "Password is required!",
    passwordMinLength: "Password should be at least 8 characters!",
  };
  
  export const FormSchemaArticle = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(() => commonErrorMessages.emailNotValid)
      .required(() => commonErrorMessages.emailRequired),
      password: yup
      .string()
      .trim()
      .required(() => commonErrorMessages.passwordRequired)
      .min(8, () => commonErrorMessages.passwordMinLength),
  });