import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import { useEffect, useRef, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";

const Login = ({ className }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onChangeUsernameHandler = (value) => {
    setUsername(value);
  };

  const onChangePasswordHandler = (value) => {
    setPassword(value);
  };

  const onChangeSavePasswordHandler = (value) => {
    setIsChecked(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("username", username);
    console.log("password", password);
    console.log("is checked", isChecked);
  };

  const showPassRef = useRef();

  useEffect(() => {
    const url = "http://localhost:3001/";
    const fetchData = async () => {
      try {
        const result = await axios(url);
        console.log(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let pwd = document.getElementById("pwd");
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

  return (
    <div className={`${classes["form-login"]} ${className}`}>
      <form className={classes["form-container"]}>
        <h3>LOGIN</h3>
        <h5>Sign in your account</h5>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            return onChangeUsernameHandler(e.target.value);
          }}
        />
        <Input
          id="pwd"
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
        <label>
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
        </label>
        <div className={classes["forgetpass"]}>Forget Password?</div>
        <Button className="btn-form" type="submit" onClick={onSubmitHandler}>
          Sign in
        </Button>
        <div className={classes["create"]}>Don't have an account? Sign up</div>
      </form>
    </div>
  );
};

export default Login;
