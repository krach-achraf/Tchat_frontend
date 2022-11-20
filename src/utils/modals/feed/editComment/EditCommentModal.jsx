import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

import "./EditCommentModal.css";

const EditCommentModal = ({ show, onEditClick, onCloseClick, content }) => {
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content);
  }, [show, onEditClick, onCloseClick, content]);

  return (
    <>
      {show ? (
        <div className="editComment-modal">
          <div className="editComment-modal-main">
            <div className="editComment-modal-header">
              <h3 className="editComment-modal-title">Edit Comment</h3>
              <button
                className="editComment-modal-btnClose"
                onClick={onCloseClick}
              >
                <FaRegWindowClose />
              </button>
            </div>
            <div className="editComment-modal-body">
              <textarea
                className="editComment-modal-content"
                placeholder="Edit the content to the post..."
                value={editedContent ? editedContent : ""}
                onChange={(e) => setEditedContent(e.target.value)}
                autoFocus
              ></textarea>

              <button
                className="editComment-modal-btnEdit"
                onClick={() => onEditClick(editedContent)}
                disabled={!editedContent}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditCommentModal;
