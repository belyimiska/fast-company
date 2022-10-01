import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((quality) => (
                    <Quality key={quality} {...getQuality(quality)} />
                ))}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
