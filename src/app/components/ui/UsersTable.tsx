import { Link } from "react-router-dom";
import Qualities from "./qualities/QualitiesList";
import Table from "../common/table";
import { SortBy } from "../common/table/TableHeader";
import Profession from "./Profession";
import { ServerUser } from "../../types/user";

type UsersTableProps = {
  users: ServerUser[];
  selectedSort: SortBy;
  onSort: (sortItem: SortBy) => void;
  onDelete: (userId: ServerUser["_id"]) => void;
  onToggleBookmark: (userId: ServerUser["_id"]) => void;
};

const UsersTable = ({
  users,
  selectedSort,
  onSort,
  onToggleBookmark,
  onDelete,
}: UsersTableProps) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user: ServerUser) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: "Качества",
      component: (user: ServerUser) => <Qualities qualities={user.qualities} />,
    },
    profession: {
      name: "Профессия",
      component: (user: ServerUser) => <Profession id={user.profession} />,
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    // bookmark: {
    //   path: "bookmark",
    //   name: "Избранное",
    //   component: (user: UserType) => (
    //     <Bookmark status={user.bookmark} onClick={() => onToggleBookmark(user._id)} />
    //   ),
    // },
    delete: {
      name: "",
      component: (user: ServerUser) => (
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
