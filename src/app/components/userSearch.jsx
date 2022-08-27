import React from "react";
import PropTypes from "prop-types";

const UserSearch = ({ onChange, searchName }) => {
    return (
        <div className="input-group">
            <input
                value={searchName}
                onChange={onChange}
                type="text"
                placeholder="Search..."
                className="form-control"
            />
        </div>
    );
};

UserSearch.propTypes = {
    onChange: PropTypes.func,
    searchName: PropTypes.string
};

export default UserSearch;
