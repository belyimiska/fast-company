import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../common/comments/commentForm";
import CommentsList from "../common/comments/commentsList";
import api from "../../api";
import _ from "lodash";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemove = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments(comments.filter((com) => com._id !== id))
            );
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            {" "}
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <CommentForm onSubmit={handleSubmit} />
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
