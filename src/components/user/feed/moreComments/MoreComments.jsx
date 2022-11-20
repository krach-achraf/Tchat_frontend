import React from "react";
import { VscTriangleDown } from "react-icons/vsc";

import './MoreComments.css'

const MoreComments = (props) =>{

    return(
        <div
          className="showComments"
          onClick={props.onMoreClick}
        >
          <span className="showText">Show more comments</span>
          <VscTriangleDown className="iconShow" />
        </div>
    )
}

export default MoreComments