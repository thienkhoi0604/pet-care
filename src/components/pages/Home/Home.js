import BasicTable from "../../Table/Table";
import Button from "../../UI/Button/Button";

const HomePage = ({ users, onLogout }) => {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <h3>Users info</h3>
      <BasicTable data={users} />
      <Button className="btn-logout" onClick={(e) => onLogout(false)}>
        Log out
      </Button>
    </div>
  );
};
export default HomePage;
