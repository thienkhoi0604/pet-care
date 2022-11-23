import classes from "./ListGroup.module.css";
import Lists from "../Lists/Lists";
import Button from "../UI/Button/Button";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const ListGroup = () => {
  const [flag, setFlag] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoGroups"],
    queryFn: async () => {
      const url = "http://localhost:3001/allgroup";
      const { data } = await axios.get(url);
      return data;
    },
  });
  if (isLoading) return "Loading";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {flag && <Navigate to="/" />}
      <div className={classes["list-group-content"]}>
        <Button className="btn-list-group" onClick={(e) => setFlag(true)}>
          Back
        </Button>
        <span className={classes["list-group-content"]}>
          <Lists data={data} />
        </span>
        <h2>List Groups</h2>
      </div>
    </>
  );
};

export default ListGroup;
