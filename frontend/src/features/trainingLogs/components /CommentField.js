import React from "react";

const CommentField = ({ comment, setComment }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="comment">
        Comment:
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
    </div>
  );
};

export default CommentField;
