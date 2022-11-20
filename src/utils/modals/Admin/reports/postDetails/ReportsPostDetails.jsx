import React, { useCallback, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import ModalImage from "react-modal-image";
import { HiOutlineBan } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Axios from "axios";

import "./ReportsPostDetails.css";
import ReportsUserDetails from "../userDetails/ReportsUserDetails";
import { base_url_reports, token } from "../../../../constants/Constants";

const ReportsPostDetails = (props) => {
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  const deletePost = useCallback(async () => {
    try {
      await Axios.delete(`${base_url_reports}/delete/post/${props.post.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
      props.onCloseClick();
      if(props.reportsLength > 1) 
        props.getReports();
      else{
        props.setReports([])
        props.setPage(0)
      }
    } catch (error) {
      console.log(error);
    }
  });

  const banUser = useCallback(async ()=>{
    try{
      await Axios.put(`${base_url_reports}/user/lock/${props.post.userId}`, {}, { headers: {"Authorization" : `Bearer ${token}`}});
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
      <div className="reports-postDetails-modal">
        <div className="reports-postDetails-modal-main">
          <div className="reports-postDetails-modal-header">
            <h3 className="reports-postDetails-modal-title">Post details</h3>
            <button
              className="reports-postDetails-modal-btnClose"
              onClick={props.onCloseClick}
            >
              <FaRegWindowClose />
            </button>
          </div>
          <div className="reports-postDetails-modal-body">
            <div className="reports-postDetails-mainContent">
              <div className="reports-postDetails-content">
                <div>
                  <span className="reports-postDetails-title">Post : </span>
                  {props.post.content ? (
                    <span>{props.post.content}</span>
                  ) : null}
                  {props.post.photoOrVideo &&
                  props.post.type.startsWith("image") ? (
                    <ModalImage
                      className="reports-postDetails-postImg"
                      small={props.post.photoOrVideo}
                      large={props.post.photoOrVideo}
                    />
                  ) : null}
                  {props.post.photoOrVideo &&
                  props.post.type.startsWith("video") ? (
                    <div>
                      <video controls>
                        <source
                          src={props.post.photoOrVideo}
                          type={props.post.type}
                        ></source>
                      </video>
                    </div>
                  ) : null}
                </div>

                {props.showButtons ? (
                  <RiDeleteBin6Line
                    className="reports-commentPostDetails-icon"
                    onClick={deletePost}
                  />
                ) : null}
              </div>

              <hr />

              <div className="reports-postDetails-user">
                <div>
                  <span className="reports-postDetails-title">User : </span>
                  <span>
                    <button
                      className="reports-commentPostDetails-button"
                      onClick={() => setShowUserDetailsModal(true)}
                    >
                      {props.post.userId}
                    </button>
                  </span>
                </div>

                {props.showButtons ? (
                  <HiOutlineBan className="reports-commentPostDetails-icon" onClick={banUser}/>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUserDetailsModal ? (
        <ReportsUserDetails
          id={props.post.typeShare ? props.post.post.userId : props.post.userId}
          onCloseClick={() => setShowUserDetailsModal(false)}
        />
      ) : null}
    </>
  );
};

export default ReportsPostDetails;
