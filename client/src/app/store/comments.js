import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    errors: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    commentCreateRequested: (state) => {
      state.isLoading = true;
    },
    commentCreateSuccesed: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    commentCreateRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    commentDeleteRequested: (state) => {
      state.isLoading = true;
    },
    commentDeleteRequestSuccesed: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
      state.isLoading = false;
    },
    commentDeleteRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsRecieved,
  commentsRequestFailed,
  commentCreateSuccesed,
  commentCreateRequested,
  commentCreateRequestFailed,
  commentDeleteRequested,
  commentDeleteRequestSuccesed,
  commentDeleteRequestFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComment(userId);
    dispatch(commentsRecieved(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};
export const createComment = (comment) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreateSuccesed(content));
  } catch (error) {
    dispatch(commentCreateRequestFailed(error.message));
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequested());
  try {
    const { content } = await commentService.deleteComment(id);
    if (content === null) {
      dispatch(commentDeleteRequestSuccesed(id));
    }
  } catch (error) {
    dispatch(commentDeleteRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
