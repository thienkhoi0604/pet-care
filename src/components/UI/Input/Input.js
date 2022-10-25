import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${classes["input-element"]} ${classes[props.className]}`}
      type={props.type || "text"}
      {...props}
    />
  );
};

export default Input;
