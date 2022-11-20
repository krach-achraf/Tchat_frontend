import React, { useCallback, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import Axios from "axios";

import { base_url_comments, base_url_reports, token } from "../../../../utils/constants/Constants";
import EditCommentModal from "../../../../utils/modals/feed/editComment/EditCommentModal";
import ReportModal from "../../../../utils/modals/feed/reportPost/RepotModal";
import formatDate from "../../../../utils/functions/FormatDate";
import Menu from "../menu/Menu";
import "./Comment.css";

const Comment = (props) => {
  const [comment, setComment] = useState(props.comment);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);

  const defaultUserImage = "/assets/images/defaultUserImg.jpg";

  const replaceUserImage = useCallback((event) => {
    event.target.src = this.state.defaultUserImage;
  });

  const editComment = useCallback(async (content) => {
    try {
      let id = comment.id;
      let response = await Axios.put(`${base_url_comments}/update`, {id, content}, { headers: {"Authorization" : `Bearer ${token}`}})
      setComment({ ...comment, content: response.data.content });
    } catch (error) {
      console.log(error);
    }
    setShowEditCommentModal(false);
  });

  const deleteComment = useCallback(async () => {
    try {
      await Axios.delete(`${base_url_comments}/delete/${comment.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
      setComment(null);
      props.setPost({ ...props.post, nbrComments: --props.post.nbrComments });
    } catch (error) {
      console.log(error);
    }
    setShowMenu(false);
  });

  const reportComment = useCallback(async (reason) => {
    try {
      let commentId = comment.id;
      let userId = props.authUserId;
      await Axios.post(`${base_url_reports}/save`, {commentId, userId, reason}, { headers: {"Authorization" : `Bearer ${token}`}});
      setShowReportCommentModal(false);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      {comment ? (
        <>
          <div className="comment">
            <div className="imgUser">
              {comment.user.photo ? (
                <img
                  src={comment.user.photo}
                  onError={replaceUserImage.bind(this)}
                  alt=""
                />
              ) : (
                <img src={defaultUserImage} onError={replaceUserImage} alt="" />
              )}
            </div>

            <div className="commentMain">
              <div className="commentHeader">
                <div className="userInfo">
                  <span className="userName color-white">
                    {comment.user.fullname}
                  </span>
                  <span className="userProfession">
                    {comment.user.profession}
                  </span>
                </div>
                <div className="commentDate">
                  {formatDate(comment.createdAt)}{" "}
                  {comment.createdAt != comment.updatedAt ? (
                    <>
                      <BsDot /> Edited{" "}
                    </>
                  ) : null}
                </div>
              </div>

              <div className="commentContent">{comment.content}</div>
            </div>
            <div
              className="commentIconMenu"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FiMoreHorizontal className="iconMore" />
              <Menu
                show={showMenu}
                postOrCommentUserId={comment.user.id}
                authUserId={props.authUserId}
                onDeleteClick={deleteComment}
                onEditClick={() => {
                  setShowEditCommentModal(true);
                  setShowMenu(false);
                }}
                onReportClick={() => setShowReportCommentModal(true)}
              />
            </div>
          </div>
          <EditCommentModal
            show={showEditCommentModal}
            onCloseClick={() => setShowEditCommentModal(false)}
            content={comment.content}
            onEditClick={editComment}
          />
          <ReportModal
            show={showReportCommentModal}
            onCloseClick={() => setShowReportCommentModal(false)}
            onSubmitClick={reportComment}
          />{" "}
        </>
      ) : null}
    </>
  );
};
export default Comment;
