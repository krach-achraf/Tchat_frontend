import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

import "./ScrollToTop.css";

const ScrollToTop = (props) => {
  const [style, setStyle] = useState({ display: "none" });

  useEffect(() => {
    document.addEventListener("scroll", showScollToTop);
    return () => {
      document.removeEventListener("scroll", showScollToTop);
    };
  });

  const showScollToTop = useCallback(() => {
    if (window.scrollY >= 4000) setStyle({ display: "block" });
    else setStyle({ display: "none" });
  });

  return (
    <BsFillArrowUpCircleFill
      className="scrollToTop"
      style={style}
      onClick={() => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        setStyle({ display: "none" });
      }}
    />
  );
};
export default ScrollToTop;
