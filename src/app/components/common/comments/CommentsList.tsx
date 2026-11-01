import { CommentType } from "../../../api/fake.api/comments.api";
import { UserType } from "../../../api/fake.api/user.api";
import Comment from "./Comment";

type CommentsListProps = {
  users: UserType[] | null;
  commentsForUser: CommentType[];
  isLoading: boolean;
  loadError: string | null;
  onRemove: (id: CommentType["_id"]) => void;
};

const CommentsList = ({
  users,
  commentsForUser,
  isLoading,
  loadError,
  onRemove,
}: CommentsListProps) => {
  const isContentLoading = isLoading || users === null;

  return (
    <>
      {isContentLoading && <h4>Loading...</h4>}
      {!isContentLoading && loadError && <h4>{loadError}</h4>}
      {!isContentLoading && !loadError && commentsForUser.length === 0 && (
        <h4>Комментариев пока нет</h4>
      )}
      {!isContentLoading &&
        !loadError &&
        commentsForUser.length !== 0 &&
        commentsForUser.map((com) => {
          const author = users.find((user) => user._id === com.userId);
          return (
            <Comment
              key={com._id}
              onRemove={onRemove}
              authorName={author?.name ?? "Автор не найден"}
              {...com}
            />
          );
        })}
    </>
  );
};

export default CommentsList;
