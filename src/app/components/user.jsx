import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark
}) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => (
                        <Quality key={quality._id} {...quality} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate} / 5</td>
                <td>
                    <BookMark
                        status={bookmark}
                        onClick={() => onToggleBookMark(_id)}
                    />
                </td>
                <td>
                    <button
                        onClick={() => onDelete(_id)}
                        className="btn btn-danger btn-sm"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.array.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
