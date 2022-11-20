import React, { useCallback, useState, useEffect, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Axios from "axios";

import {
  base_url_likes,
  base_url_posts,
  base_url_reports,
  base_url_comments,
  user,
  token,
} from "../../../../utils/constants/Constants";
import Menu from "../menu/Menu";
import PostTop from "../postTop/PostTop";
import Comment from "../comments/Comment";
import AddComment from "../addComment/AddComment";
import DoLikeShare from "../doLikeShare/DoLikeShare";
import PostContent from "../postContent/PostContent";
import MoreComments from "../moreComments/MoreComments";
import NbrInteractions from "../nbrInteractions/NbrInteractions";
import ContentPostShared from "../PostSharedContent/ContentPostShared";
import ReportModal from "../../../../utils/modals/feed/reportPost/RepotModal";
import EditPostModal from "../../../../utils/modals/feed/editPost/EditPostModal";
import "./Posts.css";

const Post = (props) => {
  const [authUserLikePost, setAuthUserLikePost] = useState(false);
  const [typeLikeOfUser, setTypeLikeOfUser] = useState("");
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(props.post);
  const [isAllCommentsReaded, setIsAllCommentsReaded] = useState(false);
  const [page, setPage] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showReportPostModal, setShowReportPostModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const authUserId = user.id;
  const size = 2;

  useEffect(() => {
    if (post) {
      if (post.nbrLikes > 0) isUserLikedPost();
    }
  });

  const isUserLikedPost = useCallback(async () => {
    let usersIdType = await usersLikedPost(post.id);
    if (usersIdType.length > 0) {
      usersIdType.forEach((userIdType) => {
        if (userIdType.userId == authUserId) {
          setAuthUserLikePost(true);
          setTypeLikeOfUser(userIdType.type);
        }
      });
    }
  });

  const usersLikedPost = useCallback(async (postId) => {
    try {
      let response = await Axios.get(`${base_url_likes}/users/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  const likeClick = useCallback(async (type) => {
    let postId = post.id;
    let userId = authUserId;
    if (authUserLikePost) {
      if (typeLikeOfUser == type) {
        try {
          await Axios.delete(
            `${base_url_likes}/delete/${postId}/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setAuthUserLikePost(false);
          setPost({ ...post, nbrLikes: post.nbrLikes - 1 });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await Axios.put(
            `${base_url_likes}/update`,
            { postId, userId, type },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setTypeLikeOfUser(type);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        await Axios.post(
          `${base_url_likes}/save`,
          {
            userId,
            postId,
            type,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAuthUserLikePost(true);
        setPost({ ...post, nbrLikes: post.nbrLikes + 1 });
      } catch (error) {
        console.log(error);
      }
    }
  });

  const shareClick = useCallback(async (contentSharedPost) => {
    try {
      let postId = post.id;
      let userId = authUserId;
      await Axios.post(
        `${base_url_posts}/share`,
        {
          postId,
          userId,
          contentSharedPost,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost({ ...post, nbrShares: post.nbrShares + 1 });
    } catch (error) {
      console.log(error);
    }
  });

  const getComments = useCallback(async () => {
    if (!isAllCommentsReaded) {
      try {
        let response = await Axios.get(
          `${base_url_comments}/${post.id}/${page}/${size}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.length == 0) setIsAllCommentsReaded(true);
        else {
          const newComments = [];
          for (let i = 0; i < response.data.length; i++) {
            let willAdd = true;
            for (let j = 0; j < comments.length; j++) {
              if (response.data[i].id == comments[j].id) {
                willAdd = false;
                break;
              }
            }
            if (willAdd) newComments.push(response.data[i]);
          }
          setComments(comments.concat(newComments));
          setPage(page + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  const addCommentToPost = useCallback(async (content) => {
    try {
      let postId = post.id;
      let userId = authUserId;
      let response = await Axios.post(
        `${base_url_comments}/save`,
        {
          content,
          postId,
          userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost({ ...post, nbrComments: post.nbrComments + 1 });
      setComments([...comments, response.data]);
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  });

  const onEditPostClick = useCallback(
    async (photoOrVideo, content, deletePhotoOrVideo) => {
      const formData = new FormData();
      formData.append("photoOrVideo", photoOrVideo);
      formData.append("postId", post.id);
      formData.append("deletePhotoOrVideo", deletePhotoOrVideo);

      if (content != null) formData.append("content", content);

      try {
        let response = await Axios.put(
          `${base_url_posts}/update`,
          formData,
          {
            headers: { "Content-Type": "multipart/form", Authorization: `Bearer ${token}`  },
          }
        );
        setPost({
          ...post,
          content: response.data.content,
          photoOrVideo: response.data.photoOrVideo,
          type: response.data.type,
        });
        setShowEditPostModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  );

  const onDeletePostClick = useCallback(async () => {
    try {
      await Axios.delete(`${base_url_posts}/delete/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(null);
      setShowEditPostModal(false);
    } catch (error) {
      console.log(error);
    }
  });

  const reportPost = useCallback(async (reason) => {
    try {
      if (reason != null) {
        let postId = post.id;
        let userId = authUserId;
        await Axios.post(
          `${base_url_reports}/save`,
          {
            postId,
            userId,
            reason,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setShowReportPostModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      {post ? (
        <div className="post">
          <div className="postTop">
            <PostTop
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              user={post.typeShare ? post.userSharedPost : post.userCreatedPost}
            />
            <div
              className="postTopRight"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FiMoreHorizontal className="iconMore" />
              <Menu
                show={showMenu}
                authUserId={authUserId}
                postOrCommentUserId={
                  post.typeShare
                    ? post.userSharedPost.id
                    : post.userCreatedPost.id
                }
                onDeleteClick={onDeletePostClick}
                onEditClick={() => {
                  setShowEditPostModal(true);
                  setShowMenu(false);
                }}
                onReportClick={() => setShowReportPostModal(true)}
              />
            </div>
          </div>

          {post.typeShare ? (
            <ContentPostShared post={post} />
          ) : (
            <PostContent post={post} />
          )}

          <NbrInteractions post={post} />

          <DoLikeShare
            onLikeClick={likeClick}
            onShareClick={shareClick}
            authUserLikePost={authUserLikePost}
            typeLikeOfUser={typeLikeOfUser}
          />

          {comments.map((el) => (
            <Comment
              comment={el}
              authUserId={authUserId}
              key={el.id}
              post={post}
              setPost={setPost}
            />
          ))}

          {post.nbrComments > 0 ? (
            <MoreComments onMoreClick={getComments} />
          ) : null}

          <AddComment onAddClick={addCommentToPost} />

          {showError ? (
            <div className="errorParag">Sorry, something went wrong.</div>
          ) : null}

          <EditPostModal
            post={post}
            file={null}
            deleteFile={false}
            show={showEditPostModal}
            onEditClick={onEditPostClick}
            onCloseClick={() => setShowEditPostModal(false)}
          />

          <ReportModal
            show={showReportPostModal}
            onCloseClick={() => setShowReportPostModal(false)}
            onSubmitClick={reportPost}
          />
        </div>
      ) : null}
    </>
  );
};
export default Post;
