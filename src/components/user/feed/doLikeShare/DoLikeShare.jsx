import React, { useState } from "react";
import { BiLike, BiShareAlt } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FcLike, FcIdea } from "react-icons/fc";
import { FaLaughSquint, FaAngry, FaSadTear } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";

import SharePostModal from "../../../../utils/modals/feed/sharePost/SharePostModal";
import "./DoLikeShare.css";

const DoLikeShare = (props) => {
  const displayNone = { display: "none" };
  const displayBlock = { display: "block" };

  const [isShow, setIsShow] = useState(false);
  const [style, setStyle] = useState(displayNone);
  const [styleLabelLike, setStyleLabelLike] = useState(displayNone);
  const [styleLabelDislike, setStyleLabelDislike] = useState(displayNone);
  const [styleLabelLove, setStyleLabelLove] = useState(displayNone);
  const [styleLabelHaha, setStyleLabelHaha] = useState(displayNone);
  const [styleLabelSad, setStyleLabelSad] = useState(displayNone);
  const [styleLabelAngry, setStyleLabelAngry] = useState(displayNone);
  const [styleLabelInsightful, setStyleLabelInsightful] = useState(displayNone);
  const [styleLabelCelebrate, setStyleLabelCelebrate] = useState(displayNone);

  return (
    <div className="doLikeShare">
      <div
        className="likes-types"
        onMouseEnter={() => setStyle({ display: "flex" })}
        onMouseLeave={() => setStyle(displayNone)}
        style={style}
      >
        <div
          className="label-reaction label-reaction-like"
          style={styleLabelLike}
        >
          Like
        </div>
        <AiFillLike
          className="icon-reaction icon-reaction-like icon-reaction-hover"
          onMouseEnter={() => setStyleLabelLike(displayBlock)}
          onMouseLeave={() => setStyleLabelLike(displayNone)}
          onClick={() => props.onLikeClick("Like")}
        />

        <div
          className="label-reaction label-reaction-dislike"
          style={styleLabelDislike}
        >
          Dislike
        </div>
        <AiFillDislike
          className="icon-reaction icon-reaction-dislike icon-reaction-hover"
          onMouseEnter={() => setStyleLabelDislike(displayBlock)}
          onMouseLeave={() => setStyleLabelDislike(displayNone)}
          onClick={() => props.onLikeClick("Dislike")}
        />

        <div
          className="label-reaction label-reaction-love"
          style={styleLabelLove}
        >
          Love
        </div>
        <FcLike
          className="icon-reaction icon-reaction-love icon-reaction-hover"
          onMouseEnter={() => setStyleLabelLove(displayBlock)}
          onMouseLeave={() => setStyleLabelLove(displayNone)}
          onClick={() => props.onLikeClick("Love")}
        />

        <div
          className="label-reaction label-reaction-haha"
          style={styleLabelHaha}
        >
          Haha
        </div>
        <FaLaughSquint
          className="icon-reaction icon-reaction-haha icon-reaction-hover"
          onMouseEnter={() => setStyleLabelHaha(displayBlock)}
          onMouseLeave={() => setStyleLabelHaha(displayNone)}
          onClick={() => props.onLikeClick("Haha")}
        />

        <div
          className="label-reaction label-reaction-sad icon-reaction-hover"
          style={styleLabelSad}
        >
          Sad
        </div>
        <FaSadTear
          className="icon-reaction icon-reaction-sad icon-reaction-hover"
          onMouseEnter={() => setStyleLabelSad(displayBlock)}
          onMouseLeave={() => setStyleLabelSad(displayNone)}
          onClick={() => props.onLikeClick("Sad")}
        />

        <div
          className="label-reaction label-reaction-angry"
          style={styleLabelAngry}
        >
          Angry
        </div>
        <FaAngry
          className="icon-reaction icon-reaction-angry icon-reaction-hover"
          onMouseEnter={() => setStyleLabelAngry(displayBlock)}
          onMouseLeave={() => setStyleLabelAngry(displayNone)}
          onClick={() => props.onLikeClick("Angry")}
        />

        <div
          className="label-reaction label-reaction-insightful"
          style={styleLabelInsightful}
        >
          Insightful
        </div>
        <FcIdea
          className="icon-reaction icon-reaction-insightful icon-reaction-hover"
          onMouseEnter={() => setStyleLabelInsightful(displayBlock)}
          onMouseLeave={() => setStyleLabelInsightful(displayNone)}
          onClick={() => props.onLikeClick("Insightful")}
        />

        <div
          className="label-reaction label-reaction-celebrate"
          style={styleLabelCelebrate}
        >
          Celebrate
        </div>
        <MdCelebration
          className="icon-reaction icon-reaction-celebrate icon-reaction-hover"
          onMouseEnter={() => setStyleLabelCelebrate(displayBlock)}
          onMouseLeave={() => setStyleLabelCelebrate(displayNone)}
          onClick={() => props.onLikeClick("Celebrate")}
        />
      </div>

      <div
        className="doLike"
        onClick={() => props.onLikeClick("Like")}
        onMouseEnter={() => setStyle({ display: "flex" })}
        onMouseLeave={() => setStyle(displayNone)}
      >
        {props.authUserLikePost ? (
          <>
            {props.typeLikeOfUser == "Like" ? 
            (<AiFillLike className="icon-reaction-like"/>) : 
            props.typeLikeOfUser == "Dislike" ? 
            (<AiFillDislike className="icon-reaction-dislike"/>) :
            props.typeLikeOfUser == "Love" ?
            (<FcLike className="icon-reaction-love"/>) :
            props.typeLikeOfUser == "Haha" ?
            (<FaLaughSquint className="icon-reaction-haha"/>) :
            props.typeLikeOfUser == "Sad" ?
            (<FaSadTear className="icon-reaction-sad"/>) : 
            props.typeLikeOfUser == "Angry" ?
            (<FaAngry className="icon-reaction-angry"/>) :
            props.typeLikeOfUser == "Insightful" ?
            (<FcIdea className="icon-reaction-insightful"/>) :
            props.typeLikeOfUser == "Celebrate" ?
            (<MdCelebration className="icon-reaction-celebrate"/>)
            : null}
          </>
        ) : (
          <BiLike />
        )}
      </div>

      <div className="doShare" onClick={() => setIsShow(true)}>
        <BiShareAlt />
      </div>

      <SharePostModal
        onShareClick={(e) => {
          props.onShareClick(e);
          setIsShow(false);
        }}
        onCloseClick={() => setIsShow(false)}
        show={isShow}
      />
    </div>
  );
};

export default DoLikeShare;
