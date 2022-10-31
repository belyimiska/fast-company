import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, color, name }) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
};

export default Quality;
