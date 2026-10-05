import { useParams } from "react-router";
import UserPage from "../components/UserPage";
import UsersList from "../components/UsersList";

const Users = () => {
  const params = useParams<{ userId?: string }>();
  const { userId } = params;

  return <>{userId ? <UserPage id={userId} /> : <UsersList />}</>;
};

export default Users;
