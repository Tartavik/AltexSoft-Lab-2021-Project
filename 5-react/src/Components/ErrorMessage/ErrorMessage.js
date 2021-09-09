import { ErrorMessage as Message } from "formik";

const ErrorMessage = ({ name }) => {
  return (
    <Message name={name}>
      {(msg) => (
        <span style={{ color: "red", fontSize: "11px", fontWeight: 600, position: 'absolute', right: '2px', top: '1px'}}>
          {msg}
        </span>
      )}
    </Message>
  );
};

export default ErrorMessage;