import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import API from "../../../api";
import { UserType } from "../../../api/fake.api/user.api";
import QualitiesList from "../../ui/qualities/QualitiesList";

type UserPageProps = {
  id: UserType["_id"];
};

const UserPage = ({ id }: UserPageProps) => {
  const history = useHistory();
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const res = API.users.getById(id);
    res.then((data) => setUser(data));
  }, [id]);

  const handleReturn = () => {
    history.replace("/users");
  };
  return (
    <>
      {!user && <h4>Loading...</h4>}
      {user && (
        <div className="m-2">
          <h1>{user.name}</h1>
          <h3>Профессия: {user.profession.name}</h3>
          <h5>
            <QualitiesList qualities={user.qualities} />
          </h5>
          <h5>Количество встреч: {user.completedMeetings}</h5>
          <h3>Оценка: {user.rate}</h3>
          <button onClick={handleReturn} className="btn btn-dark mt-3">
            Все пользователи
          </button>
        </div>
      )}
    </>
  );
};

export default UserPage;
