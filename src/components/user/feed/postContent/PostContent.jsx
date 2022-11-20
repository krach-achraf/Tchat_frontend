import React from "react";
import ModalImage from "react-modal-image";
import CustomVideo from "../../../../utils/components/customVideo/CustomVideo";
import ParagraphPost from "../paragraphPost/ParagraphPost";

import "./PostContent.css";

const PostContent = (props) => {
  return (
    <div className="postContent">
      {props.post.content ? (
        <ParagraphPost paragraphPost={props.post.content} />
      ) : null}

      {props.post.imageVideo && props.post.imageVideo.type.startsWith("image") ? (
        <ModalImage
          className="post-image"
          small={props.post.imageVideo.path}
          large={props.post.imageVideo.path}
        />
      ) : null}

      {props.post.imageVideo && props.post.imageVideo.type.startsWith("video") ? (
         <CustomVideo src={props.post.imageVideo.path} type={props.post.imageVideo.type}/>
      ) : null}
    </div>
  );
};
export default PostContent;
