// import classes from "./DetailGroup.module.css";
import GroupInfo from "../../GroupInfo/GroupInfo";
import CustomizedTables from "../../UserTable/UserTable";

const DetailGroup = ({ usersList }) => {
  return (
    <div>
      <h1>GROUP DETAIL</h1>
      <GroupInfo />
      <h3>List members</h3>
      <CustomizedTables data={usersList} />
    </div>
  );
};

export default DetailGroup;
