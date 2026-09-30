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

// type GroupListProps<T, ValueKey extends keyof T, ContentKey extends keyof T> = {
//   items: Record<string, T>;
//   selectedItem: T | null;
//   valueProperty: ValueKey;
//   contentProperty: ContentKey;
//   onItemSelect: (item: T) => void;
// };

// const GroupList = <
//   ValueKey extends string,
//   ContentKey extends string,
//   T extends Record<ValueKey, string | number> & Record<ContentKey, string | number>,
// >({
//   items,
//   selectedItem,
//   valueProperty,
//   contentProperty,
//   onItemSelect,
// }: GroupListProps<T, ValueKey, ContentKey>) =>
