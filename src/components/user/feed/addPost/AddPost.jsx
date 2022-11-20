import React, { useCallback, useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { RiLiveFill } from "react-icons/ri";
import Axios from "axios";

import Post from "../posts/Post";
import { base_url_posts, token, user } from "../../../../utils/constants/Constants";
import AddPostModal from "../../../../utils/modals/feed/addPost/AddPostModal";
import "./AddPost.css";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [photoOrVideo, setPhotoOrVideo] = useState(null);
  const [progress, setProgress] = useState(-1);
  const [newPosts, setNewPosts] = useState([]);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const sharePost = useCallback(async () => {
    const formData = new FormData();
    formData.append("photoOrVideo", photoOrVideo);
    formData.append("userId", user.id);
    if (content != null && content != "") formData.append("content", content);

    try {
      let response = await Axios.post(`${base_url_posts}/save`, formData, {
        headers: { "Content-Type": "multipart/form", "Authorization" : `Bearer ${token}`},
        onUploadProgress,
      });
      setNewPosts([response.data, ...newPosts]);
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    setProgress(-1);
    setContent("");
    setPhotoOrVideo(null);
  });

  const onUploadProgress = useCallback((event) => {
    setProgress(Math.round((100 * event.loaded) / event.total));
  });
  return (
    <>
      <div className="addPost">
        <div className="addPostTop">
          <img
            className="profileImg"
            src="/assets/images/profileImg.jpg"
            alt="Profile image"
          />
          <textarea
            placeholder="Express your opinion on something..."
            className="contentPost"
            readOnly
            onClick={() => setShowAddPostModal(true)}
          />
          <button
            className="add"
            onClick={sharePost}
            disabled={
              (content == null || content == "") && photoOrVideo == null
            }
          >
            Share
          </button>
        </div>

        <div className="addPostBottom">
          <div className="options">
            <label className="option addPhoto">
              <MdPhotoLibrary />
              <label className="optionText">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoOrVideo(e.target.files[0])}
                />
                Photo
              </label>
            </label>
            <label className="option addVideo">
              <AiFillVideoCamera />
              <label className="optionText">
                <input
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={(e) => setPhotoOrVideo(e.target.files[0])}
                />
                Video
              </label>
            </label>
            <div className="option">
              <RiLiveFill />
              <span className="optionText">LiveStream</span>
            </div>
          </div>
        </div>
      </div>

      <AddPostModal
        onCloseClick={() => setShowAddPostModal(false)}
        setPhotoOrVideo={setPhotoOrVideo}
        setContent={setContent}
        content={content}
        photoOrVideo={photoOrVideo}
        onShareClick={() => {
          setShowAddPostModal(false);
          sharePost();
        }}
        show={showAddPostModal}
      />

      {showError ? (
        <p className="errorParag">Sorry, something went wrong.</p>
      ) : null}

      {progress != -1 ? (
        <progress id="file" value={progress} max="100"></progress>
      ) : null}
      
      {newPosts.map((el) => (
        <Post post={el} key={el.id} />
      ))}
    </>
  );
};
export default AddPost;
