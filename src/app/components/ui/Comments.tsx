import { useCallback, useEffect, useMemo, useState } from "react";
import API from "../../api";
import { CommentType } from "../../api/fake.api/comments.api";
import { UserType } from "../../api/fake.api/user.api";
import AddCommentForm, { CommentData } from "../common/comments/AddCommentForm";
import CommentsList from "../common/comments/CommentsList";

type CommentsProps = {
  id: UserType["_id"];
};

const Comments = ({ id }: CommentsProps) => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [commentsForUser, setCommentsForUser] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const res = API.users.fetchAll();
    res.then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);
    setCommentsForUser([]);
    let isActual = true;

    API.comments
      .fetchCommentsForUser(id)
      .then((commentsList) => {
        if (!isActual) return;
        if (commentsList === undefined) return setLoadError("Ошибка загрузки комментариев");
        setCommentsForUser(commentsList);
      })
      .finally(() => {
        if (isActual) setIsLoading(false);
      });

    return () => {
      isActual = false;
    };
  }, [id]);

  const userOptions = useMemo(() => {
    return users ? users.map((user) => ({ value: user._id, label: user.name })) : null;
  }, [users]);

  const sortedComments = useMemo(() => {
    return [...commentsForUser].sort((a, b) => {
      return Number(b.created_at) - Number(a.created_at);
    });
  }, [commentsForUser]);

  const handleAddComment = (commentData: CommentData) => {
    return API.comments
      .add({
        ...commentData,
        pageId: id,
      })
      .then((comment) => {
        if (comment === undefined) return false;
        setCommentsForUser((prevComments) => [...prevComments, comment]);
        return true;
      });
  };

  const handleRemoveComment = useCallback((id: CommentType["_id"]) => {
    API.comments.remove(id).then((removedCommentId) => {
      if (removedCommentId === undefined) return;

      setCommentsForUser((prevComments) =>
        prevComments.filter((comment) => comment._id !== removedCommentId),
      );
    });
  }, []);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <h2>New comment</h2>
          <AddCommentForm users={userOptions} onSubmit={handleAddComment} />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr />
          <CommentsList
            users={users}
            commentsForUser={sortedComments}
            isLoading={isLoading}
            loadError={loadError}
            onRemove={handleRemoveComment}
          />
        </div>
      </div>
    </>
  );
};

export default Comments;
