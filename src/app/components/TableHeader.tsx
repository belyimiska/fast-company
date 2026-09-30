type TableHeaderProps = {
  selectedSort: SortBy;
  columns: Record<string, { path?: string; name?: string }>;
  onSort: (sortItem: SortBy) => void;
};

export type SortBy = {
  path: string;
  order: "asc" | "desc";
};

const TableHeader = ({ selectedSort, columns, onSort }: TableHeaderProps) => {
  const handleSort = (currentPath: string | undefined) => {
    if (!currentPath) return;
    if (selectedSort.path === currentPath) {
      onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
    } else {
      onSort({ path: currentPath, order: "asc" });
    }
  };

  const renderSortArrow = (currentPath: string | undefined) => {
    if (!currentPath) return;
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-down-fill" />;
      } else if (selectedSort.order === "desc") {
        return <i className="bi bi-caret-up-fill" />;
      }
    }
  };

  const columnsKeys = Object.keys(columns);

  return (
    <thead>
      <tr>
        {columnsKeys.map((col) => (
          <th
            key={col}
            onClick={columns[col].path ? () => handleSort(columns[col].path) : undefined}
            {...{ role: columns[col].path && "button" }}
            scope="col"
          >
            {columns[col].name}
            {renderSortArrow(columns[col].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
