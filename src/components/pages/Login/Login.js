import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import { useEffect, useRef, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";

const Login = ({ usersList, onLogin, className }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isChecked, setIsChecked] = useState(false);

  const showPassRef = useRef();

  useEffect(() => {
    let pwd = document.getElementById("password");
    let eye = document.getElementById("visibility");
    const showPasswordCopyRef = showPassRef.current;

    const showPasswordHandler = () => {
      eye.classList.toggle("active");

      pwd.type === "password" ? (pwd.type = "text") : (pwd.type = "password");
    };

    showPasswordCopyRef.addEventListener("click", showPasswordHandler);

    return () => {
      showPasswordCopyRef.removeEventListener("click", showPasswordHandler);
      showPassRef.current = showPasswordCopyRef;
    };
  });

  const onChangeUsernameHandler = (value) => {
    setUsername(value);
  };

  const onChangePasswordHandler = (value) => {
    setPassword(value);
  };

  // const onChangeSavePasswordHandler = (value) => {
  //   setIsChecked(value);
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      checkValidationInput(username, password) &&
      checkUserSignin(username, password)
    ) {
      console.log("Login success");
      onLogin(true);
    } else {
      console.log("Something went wrong");
    }
  };

  const checkValidationInput = (username, password) => {
    let message = document.getElementById("message");

    if (username === "") {
      message.style.display = "block";
      message.innerHTML = `Please enter your username`;
      document.getElementById("username").focus();
      return false;
    }

    if (password === "") {
      message.style.display = "block";
      message.innerHTML = `Please enter your username`;
      document.getElementById("password").focus();
      return false;
    }

    return true;
  };

  const checkUserSignin = (username, password) => {
    return (
      usersList.filter((item) => {
        if (item.email === username && item.password === password) {
          return true;
        } else {
          return false;
        }
      }).length > 0
    );
  };

  return (
    <div className={`${classes["form-login"]} ${className}`}>
      <form className={classes["form-container"]}>
        <h3>LOGIN</h3>
        <h5>Sign in your account</h5>
        <span className={classes["error"]} id="message"></span>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Email"
          value={username}
          onChange={(e) => {
            return onChangeUsernameHandler(e.target.value);
          }}
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            return onChangePasswordHandler(e.target.value);
          }}
        />
        <VisibilityOutlinedIcon
          id="visibility"
          className={classes["visibility-password"]}
          ref={showPassRef}
        />
        {/* <label>
          <div className={classes["savepass"]}>
            <Input
              type="checkbox"
              name="savepassword"
              placeholder=""
              className={{}}
              checked={isChecked}
              onChange={(e) => {
                return onChangeSavePasswordHandler(e.target.checked);
              }}
            />
            <span className={classes["remember"]}>Remember password</span>
          </div>
        </label> */}
        <Link to="not-found" className={classes["forgetpass"]}>
          Forget Password?
        </Link>
        <Button className="btn-form" type="submit" onClick={onSubmitHandler}>
          Sign in
        </Button>
        <Link to="/signup" className={classes["create"]}>
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;
