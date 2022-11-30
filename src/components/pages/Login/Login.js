import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import { useEffect, useRef, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = ({ getUser, onLogin, className }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoUsers"],
    queryFn: async () => {
      const url = "http://localhost:3001/";
      const { data } = await axios.get(url);
      return data;
    },
  });

  const showPassRef = useRef();

  useEffect(() => {
    let pwd = document.getElementById("password");
    let eye = document.getElementById("visibility");
    const showPasswordCopyRef = showPassRef.current;

    const showPasswordHandler = () => {
      eye.classList.toggle("active");

      pwd.type === "password" ? (pwd.type = "text") : (pwd.type = "password");
    };

    if (showPasswordCopyRef) {
      showPasswordCopyRef.addEventListener("click", showPasswordHandler);
    }

    return () => {
      if (showPasswordCopyRef) {
        showPasswordCopyRef.removeEventListener("click", showPasswordHandler);
      }
      showPassRef.current = showPasswordCopyRef;
    };
  });

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "1059448371288-vol44jdsvkfc0d1b96puhukpd35fv0c3.apps.googleusercontent.com",
        scope: "profile",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onChangeUsernameHandler = (value) => {
    setUsername(value);
  };

  const onChangePasswordHandler = (value) => {
    setPassword(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      checkValidationInput(username, password) &&
      checkUserSignin(username, password)
    ) {
      console.log("Login success");
      getUser(username);
      onLogin(true);

      localStorage.clear();
      localStorage.setItem("user", username);
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
      data.filter((item) => {
        if (
          item.email.trim() === username &&
          item.password.trim() === password
        ) {
          return true;
        } else {
          return false;
        }
      }).length > 0
    );
  };

  const responseGoogle = async (response) => {
    console.log("responseGoogle");
    try {
      const res = await axios.post("http://localhost:3001/googlelogin", {
        tokenId: response.tokenId,
      });

      getUser(res.data.user);
      localStorage.clear();
      localStorage.setItem("user", res.data.user);
      onLogin(true);
    } catch (err) {
      console.log("connect google fail: ", err);
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("http://localhost:3001/facebooklogin", {
        accessToken,
        userID,
      });
      getUser(res.data.user);

      localStorage.clear();
      localStorage.setItem("user", res.data.user);
      onLogin(true);
    } catch (err) {
      err.response.data.msg && console.log("connect facebook fail: ", err);
    }
  };

  if (isLoading) return "Loading";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={`${classes["form-login"]} ${className}`}>
      <form className={classes["form-container"]} onSubmit={onSubmitHandler}>
        <h3>LOGIN</h3>
        <h5>Sign in your account</h5>
        <span className={classes["error"]} id="message"></span>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => {
            return onChangeUsernameHandler(e.target.value);
          }}
          required
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

        <Link to="not-found" className={classes["forgetpass"]}>
          Forget Password?
        </Link>
        <Button className="btn-form" type="submit" onClick={onSubmitHandler}>
          Sign in
        </Button>
        <Link to="/signup" className={classes["create"]}>
          Don't have an account? Sign up
        </Link>
        <div className={classes["social-media"]}>
          <h4 className={classes["social-media-title"]}>Login with </h4>
          <GoogleLogin
            clientId="1059448371288-vol44jdsvkfc0d1b96puhukpd35fv0c3.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className={classes["social-btn"]}
              >
                <GoogleIcon />
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
          />
          <FacebookLogin
            appId="1424063898122804"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className={classes["social-btn"]}
              >
                <FacebookIcon />
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
