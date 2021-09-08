import { ErrorMessage as Message } from "formik";

const ErrorMessage = ({ name }) => {
  return (
    <Message name={name}>
      {(msg) => (
        <span style={{ color: "red", fontSize: "20px", fontWeight: 600 }}>
          {msg}
        </span>
      )}
    </Message>
  );
};

export default ErrorMessage;