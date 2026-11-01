import { useEffect, useState } from "react";
import API from "../../../api";
import { UserType } from "../../../api/fake.api/user.api";
import Comments from "../../ui/Comments";
import MeetingsCard from "../../ui/MeetingsCard";
import QualitiesCard from "../../ui/QualitiesCard";
import UserCard from "../../ui/UserCard";

type UserPageProps = {
  id: UserType["_id"];
};

const UserPage = ({ id }: UserPageProps) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const res = API.users.getById(id);
    res.then((data) => setUser(data));
  }, [id]);

  return (
    <>
      {!user && <h4>Loading...</h4>}
      {user && (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard {...user} id={id} />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard meetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <Comments id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
