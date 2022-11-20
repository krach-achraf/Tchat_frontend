import React, { useCallback } from "react";
import {BsDot} from 'react-icons/bs'

import formatDate from "../../../../utils/functions/FormatDate";
import "./PostTop.css";

const PostTop = (props) => {
  const defaultUserImage = "/assets/images/defaultUserImg.jpg";

  const replaceUserImage = useCallback((event) => {
    event.target.src = defaultUserImage;
  });

  return (
    <div className="postTopLeft">
      <div className="userImg">
        {props.user.photo ? (
          <img src={props.user.photo} onError={replaceUserImage} />
        ) : (
          <img src={defaultUserImage} />
        )}
      </div>

      <div className="userInfo">
        <span className="userName">{props.user.fullname}</span>
        <span className="userProfession">{props.user.profession}</span>
        <span className="postDate">
          {formatDate(props.createdAt)}{" "}
          {props.updatedAt != props.createdAt ? <><BsDot /> Edited </> : null}
        </span>
      </div>
    </div>
  );
};
export default PostTop;
