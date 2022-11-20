import React, { useCallback, useState } from "react";
import Axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";
import { HiOutlineBan } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReportsPostDetails from "../postDetails/ReportsPostDetails";
import ReportsUserDetails from "../userDetails/ReportsUserDetails";
import "./ReportsCommentDetails.css";
import { base_url_reports, token } from "../../../../constants/Constants";

const ReportsCommentDetails = (props) => {
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  const deleteComment = useCallback(async () => {
    try{
      await Axios.delete(`${base_url_reports}/delete/comment/${props.comment.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
      props.onCloseClick();
      if(props.reportsLength > 1) 
        props.getReports();
      else{
        props.setReports([])
        props.setPage(0)
      }
    }catch(error){
      console.log(error);
    }
  })

  const banUser = useCallback(async ()=>{
    try{
      await Axios.put(`${base_url_reports}/user/lock/${props.comment.userId}`, {}, { headers: {"Authorization" : `Bearer ${token}`}})
      props.onCloseClick();
      if(props.reportsLength > 1) 
        props.getReports();
      else{
        props.setReports([])
        props.setPage(0)
      }
    }catch(error){
      console.log(error);
    }
  })

  return (
    <>
      <div className="reports-commentDetails-modal">
        <div className="reports-commentDetails-modal-main">
          <div className="reports-commentDetails-modal-header">
            <h3 className="reports-commentDetails-modal-title">
              Comment details
            </h3>
            <button
              className="reports-commentDetails-modal-btnClose"
              onClick={props.onCloseClick}
            >
              <FaRegWindowClose />
            </button>
          </div>
          <div className="reports-commentDetails-modal-body">
            <div className="reports-commentDetails-mainContent">
              <div className="reports-commentDetails-content">
                <div>
                  <span className="reports-commentDetails-body-title">
                    Comment :
                  </span>
                  <span> {props.comment.content}</span>
                </div>

                <RiDeleteBin6Line className="reports-commentPostDetails-icon" onClick={deleteComment}/>
              </div>

              <hr />

              <div className="reports-commentDetails-user">
                <div>
                  <span className="reports-commentDetails-body-title">
                    User :&nbsp;
                  </span>
                  <span>
                    <button
                      className="reports-commentPostDetails-button"
                      onClick={() => setShowUserDetailsModal(true)}
                    >
                      {props.comment.userId}
                    </button>
                  </span>
                </div>
                <HiOutlineBan className="reports-commentPostDetails-icon" onClick={banUser}/>
              </div>

              <hr />

              <div className="reports-commentDetails-post">
                <span className="reports-commentDetails-body-title">
                  Post :&nbsp;
                </span>
                <span>
                  <button
                    className="reports-commentPostDetails-button"
                    onClick={() => setShowPostDetailsModal(true)}
                  >
                    {props.comment.post.id}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPostDetailsModal ? (
        <ReportsPostDetails
          showButtons={false}
          post={
            props.comment.post.typeShare
              ? props.comment.post.post
              : props.comment.post
          }
          onCloseClick={() => setShowPostDetailsModal(false)}
        />
      ) : null}
      {showUserDetailsModal ? (
        <ReportsUserDetails
          id={props.comment.userId}
          onCloseClick={() => setShowUserDetailsModal(false)}
        />
      ) : null}
    </>
  );
};

export default ReportsCommentDetails;
