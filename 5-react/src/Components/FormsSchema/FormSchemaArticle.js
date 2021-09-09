import * as yup from "yup";

const commonErrorMessages = {
    titleRequired: "Title is required!",
    descriptionRequired: "Description is required!",
    bodyRequired: "Body is required!",
  };
  
  export const FormSchemaArticle = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required(() => commonErrorMessages.titleRequired),
    description: yup
      .string()
      .trim()
      .required(() => commonErrorMessages.descriptionRequired),
    body: yup
    .string()
    .trim()
    .required(() => commonErrorMessages.bodyRequired)
  });