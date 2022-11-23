import classesForm from "../pages/Login/Login.module.css";
import classes from "./CreateGroup.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const CreateGroup = ({ className }) => {
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);

  const postGroup = async () => {
    const url = "http://localhost:3001/newgroup";
    try {
      await axios
        .post(url, {
          name,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("Create group success");
            console.log("response: ", res);
          }
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  const mutation = useMutation(postGroup);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(name);
    mutation.mutate({});
    setName("");
    setFlag(true);
  };
  return (
    <div className={`${classesForm["form-login"]} ${className}`}>
      {flag && <Navigate to="/list" replace={true} />}
      <form
        className={`${classesForm["form-container"]} ${classes["create-group-container"]}`}
        onSubmit={onSubmitHandler}
      >
        <h3>CREATE NEW GROUP</h3>
        <h5 className={classes["fix-margin"]}>Input your group information</h5>
        <span className={classesForm["error"]} id="message"></span>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          className="btn-new-group"
          type="submit"
          onClick={onSubmitHandler}
        >
          Create
        </Button>
        <Link to="/" className={classes["create-group"]}>
          <Button className="btn-new-group">Cancel</Button>
        </Link>
      </form>
    </div>
  );
};

export default CreateGroup;
