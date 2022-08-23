import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import Users from "./users";

const UsersList = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage id={userId} /> : <Users />}</>;
};

export default UsersList;
