import React, { useEffect } from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        dispatch(createComment(data, userId, currentUserId));
    };

    const handleRemove = (id) => {
        dispatch(removeComment(id));
        console.log(id);
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                onRemove={handleRemove}
                                comments={sortedComments}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;

// api.comments
// .add({ ...data, pageId: userId })
// .then((data) => setComments([...comments, data]));

// api.comments
//     .remove(id)
//     .then((id) =>
//         setComments(comments.filter((com) => com._id !== id))
//     );
