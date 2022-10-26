import classes from "./Signup.module.css";
import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

const DATA_LENGTH = 100000;

const Signup = ({ onLogin, isLoggin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  // const [birthday, setBirthday] = useState(null);
  // const [gender, setGender] = useState("gender");
  const [phone, setPhone] = useState("");

  const onSubmitRegistrationHandler = (event) => {
    event.preventDefault();

    const postData = async () => {
      const url = "http://localhost:3001/crud";
      try {
        await axios
          .post(url, {
            id: Math.floor(Math.random() * DATA_LENGTH),
            password: password,
            fullname: name,
            email: email,
            telephone: phone,
          })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              alert("Sign up success");
              console.log("response: ", res);
              onLogin(true);
            }
          });
      } catch (error) {
        console.log("error", error);
      }
    };

    if (checkValidationInput(email, password, repeatPassword, name, phone)) {
      if (checkRepeatPassword(password, repeatPassword)) {
        postData();
      } else {
        console.log("password not correct");
        document
          .getElementById("password")
          .classList.add(classes["invalid-repeat"]);
        document
          .getElementById("repeat-password")
          .classList.add(classes["invalid-repeat"]);
      }
    } else {
      console.log("Infomation wrong");
    }
  };

  const checkValidationInput = (email, password, repeatPassword, name, tel) => {
    let message = document.getElementById("message");
    const subHandler = (field) => {
      message.style.display = "block";
      message.innerHTML = `Please enter your ${field}`;
    };

    if (email === "") {
      subHandler("email");
      document.getElementById("email").focus();
      return false;
    }

    if (password === "") {
      subHandler("password");
      document.getElementById("password").focus();
      return false;
    }

    if (repeatPassword === "") {
      subHandler("repeat-password");
      document.getElementById("repeat-password").focus();
      return false;
    }

    if (name === "") {
      subHandler("name");
      document.getElementById("name").focus();
      return false;
    }

    if (tel === "") {
      subHandler("phone");
      document.getElementById("phone").focus();
      return false;
    }

    var reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reg.test(email)) {
      message.style.display = "block";
      message.innerHTML = "Please enter a valid email";
      return false;
    } else {
      message.innerHTML = "";
    }

    return true;
  };

  const checkRepeatPassword = (password, repeatPassword) => {
    return password === repeatPassword;
  };

  return (
    <div className={classes["form-signup"]}>
      <form
        className={classes["form-container"]}
        method="post"
        action="http://localhost:3001/users"
      >
        <img src="./images/bg-heading-03.jpg" alt="Background sign up" />
        <div className={classes["form-input-signup"]}>
          <h3>SIGN UP</h3>
          <h5>Registration info</h5>
          <span className={classes["error"]} id="message"></span>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            id="repeat-password"
            type="password"
            name="repeat-password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <label>
            <DatePicker
              type="text"
              name="birthday"
              placeholderText="Birthday"
              id="birthday"
              className={classes["birthday-picker"]}
              showYearDropdown
              popperPlacement="bottom"
              dateFormat="dd/MM/yyyy"
              selected={birthday}
              onChange={(date) => setBirthday(date)}
            />
            <CalendarMonthOutlinedIcon
              id="btn-calendar"
              className={classes["calendar-icon"]}
            />
          </label>
          <div>
            <select
              name="gender"
              id="gender"
              className={classes["input-select"]}
              value={gender}
              onChange={(e) => onSelectGenderHandler(e.target.value)}
            >
              <option disabled="disabled" value="gender">
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div> */}
          <Input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            className="btn-signup"
            type="submit"
            onClick={onSubmitRegistrationHandler}
          >
            Submit
          </Button>
          <Link to="/" className={classes["back-login"]}>
            You have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
