import { useEffect, useState } from "react";
import _ from "lodash";
import Pagination from "./Pagination";
import type { UserType } from "../api/fake.api/user.api";
import { paginate } from "../utils/paginate";
import GroupList from "./GroupList";
import API from "../api";
import type { Profession, ProfessionsType } from "../api/fake.api/professions.api";
import SearchStatus from "./SearchStatus";
import UsersTable from "./UsersTable";
import type { SortBy } from "./TableHeader";

const UsersList = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [professions, setProfessions] = useState<Profession[] | ProfessionsType | null>(null);
  const [selectedProf, setSelectedProf] = useState<Profession | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>({ path: "name", order: "asc" });

  useEffect(() => {
    const res = API.users.fetchAll();
    res.then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    const res = API.professions.fetchAll();
    res.then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const pageSize: number = 8;

  const handleDeleteUser = (userId: UserType["_id"]) => {
    setUsers((prevUsers) => {
      if (prevUsers === null) return null;
      return prevUsers.filter((user) => user._id !== userId);
    });
  };

  const handleToggleBookmark = (userId: UserType["_id"]) => {
    setUsers((prevUsers) => {
      if (prevUsers === null) return null;
      return prevUsers.map((user) => (user._id === userId ? { ...user, bookmark: !user.bookmark } : user));
    });
  };

  const handleProfessionSelect = (item: Profession) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item: SortBy) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf(null);
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList items={professions} selectedItem={selectedProf} onItemSelect={handleProfessionSelect} />
            <button onClick={clearFilter} className="btn btn-secondary mt-2">
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />

          {count > 0 && (
            <UsersTable
              users={userCrop}
              onDelete={handleDeleteUser}
              onToggleBookmark={handleToggleBookmark}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <h2>Loading...</h2>;
};

export default UsersList;
