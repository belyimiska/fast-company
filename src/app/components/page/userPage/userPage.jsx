import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [userById, setUserById] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUserById(data));
    }, []);

    const handleClick = () => {
        history.push("/users");
    };

    const handleClickTwo = () => {
        history.push(history.location.pathname + "/edit");
    };

    return (
        <>
            {userById ? (
                <div className="m-2">
                    <h1>{userById.name}</h1>
                    <h2>Профессия: {userById.profession.name}</h2>
                    <Qualities qualities={userById.qualities} />
                    <h3>Количество встреч: {userById.completedMeetings}</h3>
                    <h3>Рейтинг: {userById.rate}</h3>
                    <button onClick={handleClick}>Все пользователи</button>
                    <div className="mt-4">
                        <button onClick={handleClickTwo}>Изменить</button>
                    </div>
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
