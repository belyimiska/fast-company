import _ from "lodash";
import { ReactNode } from "react";

type TableBodyProps<T> = {
  data: T[];
  columns: Record<string, { path?: string; name?: string; component?: ReactNode | ((item: T) => ReactNode) }>;
};

const TableBody = <T extends { _id: string }>({ data, columns }: TableBodyProps<T>) => {
  const renderCell = (item: T, col: string) => {
    const { component, path } = columns[col];
    if (component !== undefined) {
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    if (!path) return null;
    return _.get(item, path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((col) => (
            <td key={col}>{renderCell(item, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
