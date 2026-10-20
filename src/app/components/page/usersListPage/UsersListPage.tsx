import { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";
import Pagination from "../../common/Pagination";
import type { UserType } from "../../../api/fake.api/user.api";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/GroupList";
import API from "../../../api";
import type { Profession, ProfessionsType } from "../../../api/fake.api/professions.api";
import SearchStatus from "../../ui/SearchStatus";
import UsersTable from "../../ui/UsersTable";
import type { SortBy } from "../../common/table/TableHeader";

const UsersListPage = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [professions, setProfessions] = useState<ProfessionsType | null>(null);
  const [selectedProf, setSelectedProf] = useState<Profession | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState<string>("");

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
  }, [selectedProf, searchQuery]);

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
      return prevUsers.map((user) =>
        user._id === userId ? { ...user, bookmark: !user.bookmark } : user,
      );
    });
  };

  const handleSearchQuery = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
    if (selectedProf) {
      setSelectedProf(null);
    }
  };

  const handleProfessionSelect = (item: Profession) => {
    setSelectedProf(item);
    setSearchQuery("");
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item: SortBy) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : selectedProf
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
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button onClick={clearFilter} className="btn btn-secondary mt-2">
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />

          <input
            type="text"
            placeholder="Введите имя..."
            name="searchQuery"
            value={searchQuery}
            onChange={handleSearchQuery}
          />

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

export default UsersListPage;
