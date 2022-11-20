import React from "react";

import PostContent from "../postContent/PostContent";
import PostTop from "../postTop/PostTop";
import NbrInteractions from "../nbrInteractions/NbrInteractions";
import "./ContentPostShared.css";
import ParagraphPost from "../paragraphPost/ParagraphPost";

const ContentPostShared = (props) => {

  return (
    <>
      {props.post.content ? (
        <div className="postContent contentSharedPostText">
          <ParagraphPost paragraphPost={props.post.content}/>
        </div>
      ) : null}
      <div className="contentSharedPost">
        <div className="postTop">
          <PostTop
            createdAt={props.post.post.createdAt}
            updatedAt={props.post.post.updatedAt}
            user={props.post.userSharedPost}
          />
        </div>

        <PostContent post={props.post.post} />
        <NbrInteractions
          post={props.post.post}
        />
      </div>
    </>
  );
};

export default ContentPostShared;
