import { useParams } from "react-router";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
  const params = useParams<{ userId?: string }>();
  const { userId } = params;

  return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

export default Users;
