import classes from "./Signup.module.css";
import React, { useEffect, useState } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("gender");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const showCalendar = () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    showCalendar();
  });

  const onSubmitRegistrationHandler = (event) => {
    event.preventDefault();

    console.log("Name: ", name);
    console.log("Birthday: ", birthday);
    console.log("Gender: ", gender);
    console.log("Email: ", email);
    console.log("Phone: ", phone);
  };

  return (
    <div className={classes["form-signup"]}>
      <form className={classes["form-container"]}>
        <img src="./images/bg-heading-03.jpg" alt="Background sign up" />
        <div className={classes["form-input-signup"]}>
          <h3>SIGN UP</h3>
          <h5>Registration info</h5>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>
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
              className={classes["input-select"]}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled="disabled" value="gender">
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            className="btn-form"
            type="submit"
            onClick={onSubmitRegistrationHandler}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
