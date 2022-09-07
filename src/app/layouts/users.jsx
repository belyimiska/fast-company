import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserPageChange from "../components/page/userPageChange.jsx/userPageChange";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {edit ? (
                <UserPageChange id={userId} />
            ) : userId ? (
                <UserPage id={userId} />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
