import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        commentCreateFailed: (state, action) => {
            state.error = action.payload;
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentRemoveFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentCreateFailed,
    commentRemoved,
    commentRemoveFailed
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message));
    }
};

export const createComment =
    (payload, userId, currentUserId) => async (dispatch) => {
        dispatch(createCommentRequested());
        const comment = {
            ...payload,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreateFailed(error.message));
        }
    };

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
