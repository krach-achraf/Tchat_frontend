import React from "react";
import { useState } from "react";

import { FaRegWindowClose } from "react-icons/fa";

import "./SharePostModal.css";

const SharePostModal = (props) => {
    const [contentSharedPost, setContentSharedPost] = useState("");

    return (
        <>
        {props.show ? (
            <div className="sharePost-modal">
            <div className="sharePost-modal-main">
                <div className="sharePost-modal-header">
                <h3 className="sharePost-modal-title">Share post</h3>
                <button
                    className="sharePost-modal-btnClose"
                    onClick={props.onCloseClick}
                >
                    <FaRegWindowClose />
                </button>
                </div>
                <div className="sharePost-modal-body">
                <textarea
                    className="sharePost-modal-content"
                    placeholder="Add a content to the post..."
                    value={contentSharedPost}
                    onChange={(e) => setContentSharedPost(e.target.value)}
                    autoFocus
                ></textarea>
                <button
                    className="sharePost-modal-btnShare"
                    onClick={() => props.onShareClick(contentSharedPost)}
                >
                    Share
                </button>
                </div>
            </div>
            </div>
        ) : null}
        </>
    );
};

export default SharePostModal;
