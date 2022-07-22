import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
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
          <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
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

export default User;
