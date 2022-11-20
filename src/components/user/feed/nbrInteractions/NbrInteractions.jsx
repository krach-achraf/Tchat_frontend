import React, { useState, useCallback } from "react";
import Axios from "axios";
import { BiLike, BiShareAlt, BiComment } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FcLike, FcIdea } from "react-icons/fc";
import { FaLaughSquint, FaAngry, FaSadTear } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { VscTriangleDown } from "react-icons/vsc";

import "./NbrInteractions.css";
import { base_url_likes, token } from "../../../../utils/constants/Constants";

const NbrInteractions = (props) => {
  const [likes, setLikes] = useState({});

  const getLikes = useCallback(async () => {
    try {
      let response = await Axios.get(`${base_url_likes}/${props.post.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
      setLikes(response.data);
    } catch (error) {
      console.log(error);
    }
  });

  const customNbrReaction = useCallback((nbr) => {
    if (nbr < 1000) return nbr;
    else if (nbr >= 1000 && nbr < 1000000) {
      let result = nbr.slice(0, -3);
      nbr.charAt(nbr.length - 3) > 0
        ? (result += "." + nbr.charAt(nbr.length - 3) + "K")
        : (result += "K");
      return result;
    } else if (nbr >= 1000000 && nbr < 1000000000) {
      let result = nbr.slice(0, -6);
      nbr.charAt(nbr.length - 6) > 0
        ? (result += "." + nbr.charAt(nbr.length - 6) + "M")
        : (result += "M");
      return result;
    } else if (nbr >= 1000000000 && nbr < 1000000000000) {
      let result = nbr.slice(0, -9);
      nbr.charAt(nbr.length - 9) > 0
        ? (result += "." + nbr.charAt(nbr.length - 9) + "B")
        : (result += "B");
      return result;
    }
  });

  return (
    <>
      {props.post.nbrLikes > 0 ||
      props.post.nbrComments > 0 ||
      props.post.nbrShares > 0 ? (
        <div className="nbrLikesSharesComments">
          {props.post.nbrLikes > 0 ? (
            <div
              className="nbrLikes"
              onMouseEnter={() => {
                getLikes();
              }}
            >
              <div className="likes-details" >
                {likes.Like > 0 ? (
                  <>
                    <div className="like-detail">
                      <AiFillLike className="like-detail-icon like-detail-icon-like" />
                      <span>{likes.Like}</span>
                    </div>
                  </>
                ) : null}

                {likes.Dislike > 0 ? (
                  <>
                    <div className="like-detail">
                      <AiFillDislike className="like-detail-icon like-detail-icon-dislike" />
                      <span>{likes.Dislike}</span>
                    </div>
                  </>
                ) : null}

                {likes.Love > 0 ? (
                  <>
                    <div className="like-detail">
                      <FcLike className="like-detail-icon like-detail-icon-love" />
                      <span>{likes.Love}</span>
                    </div>
                  </>
                ) : null}

                {likes.Haha > 0 ? (
                  <>
                    <div className="like-detail">
                      <FaLaughSquint className="like-detail-icon like-detail-icon-haha" />
                      <span>{likes.Haha}</span>
                    </div>
                  </>
                ) : null}

                {likes.Sad > 0 ? (
                  <>
                    <div className="like-detail">
                      <FaSadTear className="like-detail-icon like-detail-icon-sad" />
                      <span>{likes.Sad}</span>
                    </div>
                  </>
                ) : null}

                {likes.Angry > 0 ? (
                  <>
                    <div className="like-detail">
                      <FaAngry className="like-detail-icon like-detail-icon-angry" />
                      <span>{likes.Angry}</span>
                    </div>
                  </>
                ) : null}

                {likes.Insightful > 0 ? (
                  <>
                    <div className="like-detail">
                      <FcIdea className="like-detail-icon like-detail-icon-insightful" />
                      <span>{likes.Insightful}</span>
                    </div>
                  </>
                ) : null}

                {likes.Celebrate > 0 ? (
                  <>
                    <div className="like-detail">
                      <MdCelebration className="like-detail-icon like-detail-icon-celebrate" />
                      <span>{likes.Celebrate}</span>
                    </div>
                  </>
                ) : null}

                <VscTriangleDown className="triangle-icon" />
              </div>
              <BiLike className="iconLike" />
              <span className="nbrLikesText">
                {customNbrReaction(props.post.nbrLikes.toString())} Like
                {props.post.nbrLikes > 1 ? "s" : null}
              </span>
            </div>
          ) : null}

          {props.post.nbrComments > 0 ? (
            <div className="nbrComments">
              <BiComment className="iconComment" />
              <span className="nbrCommentsText">
                {customNbrReaction(props.post.nbrComments.toString())} Comment
                {props.post.nbrComments > 1 ? "s" : null}
              </span>
            </div>
          ) : null}

          {props.post.nbrShares > 0 ? (
            <div className="nbrShares">
              <BiShareAlt className="iconShare" />
              <span className="nbrSharesText">
                {customNbrReaction(props.post.nbrShares.toString())} Share
                {props.post.nbrShares > 1 ? "s" : null}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default NbrInteractions;
