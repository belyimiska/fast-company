import { Link } from "react-router-dom";
import { UserType } from "../api/fake.api/user.api";
import Bookmark from "./Bookmark";
import QualitiesList from "./QualitiesList";
import Table from "./Table";
import { SortBy } from "./TableHeader";

type UsersTableProps = {
  users: UserType[];
  selectedSort: SortBy;
  onSort: (sortItem: SortBy) => void;
  onDelete: (userId: UserType["_id"]) => void;
  onToggleBookmark: (userId: UserType["_id"]) => void;
};

const UsersTable = ({ users, selectedSort, onSort, onToggleBookmark, onDelete }: UsersTableProps) => {
  const columns = {
    name: { name: "Имя", component: (user: UserType) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: "Качества", component: (user: UserType) => <QualitiesList qualities={user.qualities} /> },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user: UserType) => <Bookmark status={user.bookmark} onClick={() => onToggleBookmark(user._id)} />,
    },
    delete: {
      name: "",
      component: (user: UserType) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          delete
        </button>
      ),
    },
  };

  return (
    <>
      <Table data={users} {...{ selectedSort, columns, onSort }} />
    </>
  );
};

export default UsersTable;
