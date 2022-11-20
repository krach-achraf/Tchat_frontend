import React, { useEffect } from "react";
import { useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import ModalImage from "react-modal-image";
import { FaRegWindowClose } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./EditPostModal.css";
import CustomVideo from "../../../components/customVideo/CustomVideo";

const EditPostModal = ({
  show,
  onEditClick,
  onCloseClick,
  file,
  deleteFile,
  post,
}) => {
  const [contentEditedPost, setContentEditedPost] = useState(post.content);
  const [photoOrVideo, setPhotoOrVideo] = useState(post.imageVideo);
  const [type, setType] = useState(post.type);
  const [selectedFile, setSelectedFile] = useState(file);
  const [deletePhotoOrVideo, setDeletePhotoOrVideo] = useState(deleteFile);

  useEffect(() => {
    setContentEditedPost(post.content);
    setPhotoOrVideo(post.photoOrVideo);
    setType(post.type);
    setSelectedFile(file);
    setDeletePhotoOrVideo(deleteFile);
  }, [onCloseClick, file, deleteFile, post]);

  return (
    <>
      {show ? (
        <div className="editPost-modal">
          <div className="editPost-modal-main">
            <div className="editPost-modal-header">
              <h3 className="editPost-modal-title">Edit post</h3>
              <button
                className="editPost-modal-btnClose"
                onClick={onCloseClick}
              >
                <FaRegWindowClose />
              </button>
            </div>
            <div className="editPost-modal-body">
              <textarea
                className="editPost-modal-content"
                placeholder="Edit the content to the post..."
                value={contentEditedPost ? contentEditedPost : ""}
                onChange={(e) => setContentEditedPost(e.target.value)}
                autoFocus
              ></textarea>

              {!post.isTypeShare ? (
                <>
                  {photoOrVideo ? (
                    <div className="editPost-modal-postPhotoVideo">
                      {type.startsWith("image") ? (
                        <ModalImage
                          className="editPost-post-image"
                          small={post.imageVideo.path}
                          large={post.imageVideo.path}
                        />
                      ) : (
                        <CustomVideo src={photoOrVideo} type={type} toEditPost/>
                      )}
                      <ImCross
                        className="editPost-modal-postPhotoVideo-icon"
                        onClick={() => {
                          setPhotoOrVideo(null);
                          setDeletePhotoOrVideo(true);
                        }}
                      />
                    </div>
                  ) : null}

                  <div className="editPost-modal-photoOrVideo">
                    <label className="editPost-modal-photoOrVideo-option editPost-modal-photo-option">
                      <MdPhotoLibrary className="editPost-modal-photoOrVideo-icon" />
                      <label className="editPost-modal-photoOrVideo-optionText">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        Photo
                      </label>
                    </label>
                    <label className="editPost-modal-photoOrVideo-option editPost-modal-video-option">
                      <AiFillVideoCamera className="editPost-modal-photoOrVideo-icon" />
                      <label className="editPost-modal-photoOrVideo-optionText">
                        <input
                          type="file"
                          accept="video/mp4,video/x-m4v,video/*"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        Video
                      </label>
                    </label>
                  </div>
                </>
              ) : null}

              <button
                className="editPost-modal-btnEdit"
                onClick={() =>
                  onEditClick(
                    selectedFile,
                    contentEditedPost,
                    deletePhotoOrVideo
                  )
                }
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

export default EditPostModal;
