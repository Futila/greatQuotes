import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentList from "./CommentsList";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p>No comments were found</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
