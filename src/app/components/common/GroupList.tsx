type GroupListProps<T> = {
  items: T[] | Record<string, T>;
  selectedItem: T | null;
  valueProperty?: keyof T;
  contentProperty?: keyof T;
  onItemSelect: (item: T) => void;
};

const GroupList = <T extends Record<string, string>>({
  items,
  selectedItem,
  valueProperty = "_id",
  contentProperty = "name",
  onItemSelect,
}: GroupListProps<T>) => {
  const isArray = Array.isArray(items);
  const itemsArr = isArray ? items : Object.values(items);

  return (
    <ul className="list-group">
      {itemsArr.map((item) => (
        <li
          key={item[valueProperty]}
          className={"list-group-item" + (item === selectedItem ? " active" : "")}
          role="button"
          onClick={() => onItemSelect(item)}
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
