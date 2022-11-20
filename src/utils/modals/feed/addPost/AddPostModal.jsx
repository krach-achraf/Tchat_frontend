import React from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";

import "./AddPostModal.css";

const AddPostModal = (props) => {

  return (
    <>
      {props.show ? (
        <div className="addPost-modal">
          <div className="addPost-modal-main">
            <div className="addPost-modal-header">
              <h3 className="addPost-modal-title">Create a post</h3>
              <button
                className="addPost-modal-btnClose"
                onClick={props.onCloseClick}
              >
                <FaRegWindowClose />
              </button>
            </div>
            <div className="addPost-modal-body">
              <textarea
                className="addPost-modal-content"
                placeholder="Express your opinion on something..."
                value={props.content}
                onChange={(e) => props.setContent(e.target.value)}
                autoFocus
              ></textarea>

              <div className="addPost-modal-photoOrVideo">
                <label className="addPost-modal-photoOrVideo-option addPost-modal-photo-option">
                  <MdPhotoLibrary className="addPost-modal-photoOrVideo-icon" />
                  <label className="addPost-modal-photoOrVideo-optionText">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => props.setPhotoOrVideo(e.target.files[0])}
                    />
                    Photo
                  </label>
                </label>
                <label className="addPost-modal-photoOrVideo-option addPost-modal-video-option">
                  <AiFillVideoCamera className="addPost-modal-photoOrVideo-icon" />
                  <label className="addPost-modal-photoOrVideo-optionText">
                    <input
                      type="file"
                      accept="video/mp4,video/mkv,video/x-m4v,video/*"
                      onChange={(e) => props.setPhotoOrVideo(e.target.files[0])}
                    />
                    Video
                  </label>
                </label>
              </div>

              <button
                className="addPost-modal-btnShare"
                onClick={props.onShareClick}
                disabled={
                  (props.content == null || props.content == "") && props.photoOrVideo == null
                }
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

export default AddPostModal;
