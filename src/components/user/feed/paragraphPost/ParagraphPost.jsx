import React, { useState } from "react";

import "./ParagraphPost.css";

const ParagraphPost = (props) => {
  const [moreText, setMoreText] = useState(true);

  return (
    <div className="paragraphPost">
      <>
        {props.paragraphPost.length >= 150 ? (
          <>
            {moreText ? (
              <>
              {props.paragraphPost.slice(0,120) + "..."}
                <button
                  className="paragraphPost_btnMoreLess"
                  onClick={()=>setMoreText(false)}
                >
                  More
                </button>
              </>
            ) : (
              <>
              {props.paragraphPost}
                <button
                  className="paragraphPost_btnMoreLess"
                  onClick={() => setMoreText(true)}
                >
                  Less
                </button>
              </>
            )}
          </>
        ) : (
          props.paragraphPost
        )}
      </>
    </div>
  );
};

export default ParagraphPost;
