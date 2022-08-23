import React, { useState, useEffect } from "react";
import api from "../api/index";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [userById, setUserById] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUserById(data));
    }, []);

    const history = useHistory();
    const handleUsersListReturn = () => {
        history.push("/users");
    };

    return (
        <>
            {userById ? (
                <div className="m-2">
                    <h1>{userById.name}</h1>
                    <h2>Профессия: {userById.profession.name}</h2>
                    <QualitiesList qualities={userById.qualities} />
                    <h3>Количество встреч: {userById.completedMeetings}</h3>
                    <h3>Рейтинг: {userById.rate}</h3>
                    <button onClick={() => handleUsersListReturn()}>
                        Все пользователи
                    </button>
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
