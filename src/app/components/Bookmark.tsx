type BookmarkProps = {
  status: boolean;
  onClick: () => void;
};

const Bookmark = ({ status, ...rest }: BookmarkProps) => {
  return (
    <button {...rest}>
      <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
    </button>
  );
};

export default Bookmark;
