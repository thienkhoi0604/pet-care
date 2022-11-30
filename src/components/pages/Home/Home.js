import classes from "./Home.module.css";
import Button from "../../UI/Button/Button";
import CollapsibleTable from "../../Table/Table";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ user, onLogout }) => {
  const [groupMember, setGroupMember] = useState([]);
  const [groupOwner, setGroupOwner] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoAccountAndGroup"],
    queryFn: async () => {
      const url = "http://localhost:3001/user";
      const { data } = await axios.get(url, { params: { email: user } });
      return data;
    },
  });

  useEffect(() => {
    const splitGroup = () => {
      if (data && Array.isArray(data)) {
        const member = data.filter((element) => {
          return element.role.trim() === "member";
        });
        const owner = data.filter((element) => {
          return element.role.trim() !== "member";
        });
        setGroupMember(member);
        setGroupOwner(owner);
      }
    };
    splitGroup();
    return () => {
      setGroupMember([]);
      setGroupOwner([]);
    };
  }, [data]);

  if (isLoading) return "Loading";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={classes["homepage-container"]}>
      <h1>HOME PAGE</h1>
      <div>
        {groupMember.length !== 0 ? (
          <div>
            <h3>Group you are member</h3>
            <CollapsibleTable data={groupMember} />
          </div>
        ) : (
          <h3>You don't have role "member" in any group</h3>
        )}
        {groupOwner.length !== 0 ? (
          <div>
            <h3 className={classes["title-table"]}>Group you created</h3>
            <CollapsibleTable data={groupOwner} />
          </div>
        ) : (
          <h3>You don't have role "owner" or "co-owner" in any group</h3>
        )}
      </div>
      <Link to="/newgroup" className={classes["create-group"]}>
        <Button>Create Group</Button>
      </Link>
      <Button className="btn-logout" onClick={(e) => onLogout(false)}>
        Log out
      </Button>
    </div>
  );
};
export default HomePage;
