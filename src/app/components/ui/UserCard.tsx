import { Link } from "react-router-dom";
import { UserType } from "../../api/fake.api/user.api";

type UserCardProps = Pick<UserType, "name" | "profession" | "rate"> & {
  id: UserType["_id"];
};

const UserCard = ({ name, profession, rate, id }: UserCardProps) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          to={`/users/${id}/edit`}
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
        >
          <i className="bi bi-gear"></i>
        </Link>

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={`https://api.dicebear.com/10.x/avataaars/svg?seed=${(Math.random() + 1).toString(36).substring(7)}`}
            className="rounded-circle"
            width="150"
            alt="Аватар пользователя"
          />

          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{profession.name}</p>

            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
