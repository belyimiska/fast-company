import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  if (users.length === 0) {
    return (
      <h2>
        <span className="badge bg-danger m-2">Никто с тобой не тусанёт</span>
      </h2>
    );
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} {...rest} {...user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
