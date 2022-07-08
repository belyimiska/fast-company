import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const standartBadge = "badge m-2 bg-";

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    if (number >= 2 && number <= 4) {
      return (
        <span className="badge bg-primary m-2">
          {number} человека тусанут с тобой сегодня
        </span>
      );
    }

    if (number === 1 || (number >= 5 && number <= 12)) {
      return (
        <span className="badge bg-primary m-2">
          {number} человек тусанёт с тобой сегодня
        </span>
      );
    }
  };

  if (users.length === 0) {
    return (
      <h1>
        <span className="badge bg-danger m-2">Никто с тобой не тусанёт</span>
      </h1>
    );
  }

  return (
    <>
      <h1>{renderPhrase(users.length)}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <span
                    className={standartBadge + quality.color}
                    key={quality._id}
                  >
                    {quality.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate} / 5</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
