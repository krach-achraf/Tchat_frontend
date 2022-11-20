import React from "react";
import { GoTriangleUp } from "react-icons/go";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";

import "./Menu.css";

const Menu = (props) => {

  return (
    <>
      {props.show ? (
        <div className="menu">
          <GoTriangleUp className="triangleIcon" />

          <div className="menu-main">
            {props.postOrCommentUserId == props.authUserId ? (
              <>
                <div className="menuItem" onClick={props.onEditClick}>
                  <VscEdit className="iconMenuItem" />
                  <button className="buttonMenuItem">Edit</button>
                </div>

                <hr className="hrMenu"/>

                <div className="menuItem deleteItem" onClick={props.onDeleteClick}>
                  <AiOutlineDelete className="iconMenuItem" />
                  <button className="buttonMenuItem" >Delete</button>
                </div>
              </>
            ) : null}

            {props.postOrCommentUserId != props.authUserId ? (
              <div className="menuItem" onClick={props.onReportClick}>
                <MdOutlineReportProblem className="iconMenuItem" />
                <button className="buttonMenuItem">Report</button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Menu;
