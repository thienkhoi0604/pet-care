import classes from "./Input.module.css";

const Input = ({ ...rest }) => {
  return (
    <>
      <input
        className={`${classes["input-element"]} ${classes[rest.className]}`}
        type={rest.type || "text"}
        {...rest}
      />
    </>
  );
};

export default Input;
