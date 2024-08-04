/* eslint-disable indent */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from "../../../store/comments";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const CommentsCard = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoadingStatus());

  const onSubmit = (data) => {
    const comment = {
      ...data,
      pageId: userId
    };
    dispatch(createComment(comment));
  };

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={onSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {!isLoading
            ? sortedComments.map((comment) => (
                <Comment
                  key={comment._id}
                  onRemove={handleRemoveComment}
                  {...comment}
                />
              ))
            : "Loading..."}
        </div>
      </div>
    </>
  );
};

CommentsCard.propTypes = {
  userId: PropTypes.string
};

export default CommentsCard;
