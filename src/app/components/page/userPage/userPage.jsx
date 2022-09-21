import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    const [userById, setUserById] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUserById(data));
    }, []);

    return (
        <>
            {userById ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={userById} />
                            <QualitiesCard user={userById} />
                            <MeetingsCard user={userById} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
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
