import classes from "./Button.module.css";

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={`${classes["btn"]} ${classes[className]}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
