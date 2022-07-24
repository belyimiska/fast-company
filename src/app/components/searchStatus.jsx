import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    if (length >= 2 && length <= 4) {
        return (
            <h2>
                <span className="badge bg-primary m-2">
                    {length} человека тусанут с тобой сегодня
                </span>
            </h2>
        );
    }

    if (length === 1 || (length >= 5 && length <= 12)) {
        return (
            <h2>
                <span className="badge bg-primary m-2">
                    {length} человек тусанёт с тобой сегодня
                </span>
            </h2>
        );
    }
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
