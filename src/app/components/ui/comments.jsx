import React from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import _ from "lodash";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemove = (id) => {
        removeComment(id);
        // api.comments
        //     .remove(id)
        //     .then((id) =>
        //         setComments(comments.filter((com) => com._id !== id))
        //     );
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            {" "}
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            onRemove={handleRemove}
                            comments={sortedComments}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
