import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <EditUserPage id={userId} />
                ) : (
                    <UserPage id={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
