import React, { useState } from "react";

import "./AddComment.css";

const AddComment = (props) => {
  const [contentComment, setContentComment] = useState("");

  return (
    <div className="addComment">
      <div className="imageUser">
        <img src="/assets/images/profileImg.jpg" alt="" />
      </div>
      <div className="addComentText">
        <textarea
          placeholder="Add a comment..."
          value={contentComment}
          onChange={(e) => setContentComment(e.target.value)}
        ></textarea>
        <div>
          <button
            className="addBtn"
            onClick={() => {
              props.onAddClick(contentComment);
              setContentComment("");
            }}
            disabled={!contentComment && contentComment == ''}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
