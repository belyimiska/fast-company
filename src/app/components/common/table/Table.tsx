import { ReactNode } from "react";
import TableBody from "./TableBody";
import TableHeader, { SortBy } from "./TableHeader";

type TableProps<T> =
  | {
      data: T[];
      columns: Record<
        string,
        { path?: string; name?: string; component?: ReactNode | ((item: T) => ReactNode) }
      >;
      selectedSort: SortBy;
      onSort: (sortItem: SortBy) => void;
    }
  | { children: ReactNode };

const Table = <T extends { _id: string }>(props: TableProps<T>) => {
  if ("data" in props) {
    const { data, selectedSort, columns, onSort } = props;

    return (
      <table className="table">
        <TableHeader {...{ selectedSort, columns, onSort }} />
        <TableBody {...{ data, columns }} />
      </table>
    );
  }

  return <table className="table">{props.children}</table>;
};

export default Table;
