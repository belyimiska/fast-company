import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderSortArrow = (selectedSort, currentPath) => {
        const arrowDown = <i className="bi bi-caret-down-fill m-2"></i>;
        const arrowUp = <i className="bi bi-caret-up-fill m-2"></i>;

        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "desc") {
                return arrowDown;
            } else if (selectedSort.order === "asc") {
                return arrowUp;
            }
        }
        return null;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name}
                        {renderSortArrow(selectedSort, columns[column].path)}
                    </th>
                ))}

                {/* <th>Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">
                    Профессия
                </th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="col">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="col">
                    Избранное
                </th>
                <th /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
