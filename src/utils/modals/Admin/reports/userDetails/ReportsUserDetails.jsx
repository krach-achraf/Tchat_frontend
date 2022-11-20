import Axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { base_url_ms_auth, base_url_ms_users } from "../../../../constants/Constants";

import "./ReportsUserDetails.css";

const ReportsUserDetails = (props) => {
  const [user, setUser] = useState(null);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      getUser();
      firstRender.current = false;
    }
  }, []);

  const getUser = useCallback(async () => {
    try {
      let response = await Axios.get(
        `${base_url_ms_users}user/id/${props.id}` 
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <div className="reports-userDetails-modal">
        <div className="reports-userDetails-modal-main">
          <div className="reports-userDetails-modal-header">
            <h3 className="reports-userDetails-modal-title">User details</h3>
            <button
              className="reports-userDetails-modal-btnClose"
              onClick={props.onCloseClick}
            >
              <FaRegWindowClose />
            </button>
          </div>
          {user ? (
            <div className="reports-userDetails-modal-body">
              <div className="reports-userDetails-userImg">
                {user.photo ? (
                  <img src={user.photo} alt="" />
                ) : (
                  <img src="/assets/images/profileImg.jpg" alt="" />
                )}
              </div>
              <div className="reports-userDetails-userInfo">
                <div>
                  <span className="reports-userDetails-userInfo-title">
                    Full name :{" "}
                  </span>
                  <span>{user.fullname}</span>
                </div>
                <hr className="reports-userDetails-hr" />
                <div>
                  <span className="reports-userDetails-userInfo-title">
                    User name :{" "}
                  </span>
                  <span>{user.username}</span>
                </div>
                <hr className="reports-userDetails-hr" />
                <div>
                  <span className="reports-userDetails-userInfo-title">
                    Email :{" "}
                  </span>
                  <span>{user.email}</span>
                </div>
                <hr className="reports-userDetails-hr" />
                <div>
                  <span className="reports-userDetails-userInfo-title">
                    Gender :{" "}
                  </span>
                  <span>{user.gender}</span>
                </div>

                {user.birthDay ? (
                  <>
                    <hr className="reports-userDetails-hr" />
                    <div>
                      <span className="reports-userDetails-userInfo-title">
                        Birthday :{" "}
                      </span>
                      <span>{user.birthDay.slice("T")[0]}</span>
                    </div>
                  </>
                ) : null}
                <hr className="reports-userDetails-hr" />
                <div>
                  <span className="reports-userDetails-userInfo-title">
                    Profession :{" "}
                  </span>
                  <span>{user.profession}</span>
                </div>
                {user.website ? (
                  <>
                    <hr className="reports-userDetails-hr" />
                    <div>
                      <span className="reports-userDetails-userInfo-title">
                        Website :{" "}
                      </span>
                      <span>{user.website}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReportsUserDetails;
