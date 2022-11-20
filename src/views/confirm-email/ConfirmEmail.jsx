import Axios from "axios";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";

import { authorities, base_url_ms_auth, user } from "../../utils/constants/Constants";
import "./ConfirmEmail.css";

const ConfirmEmail = () => {
  const history = useHistory();
  if (user != null){
    if(authorities.includes("ROLE_ADMIN"))
      history.push("/admin_home");
    else
      history.push("/feed");
  } 

  const params = useParams();
  const firstRender = useRef(true);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (firstRender.current) {
      confirmToken();
      firstRender.current = false;
    }
  });

  const confirmToken = useCallback(async () => {
    try {
      await Axios.get(`${base_url_ms_auth}confirm?token=${params.token}`);
      setTitle("Congratulations!");
      setMessage(
        "Your email has already been confimerd. You can now login to the application."
      );
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setTitle("Error!");
      setMessage(error.response.data);
    }
  });

  return (
    <div
      className="confirmEmail"
      style={
        success
          ? { backgroundColor: "#2DCE97" }
          : { backgroundColor: "#df3030" }
      }
    >
      <div className="confirmEmail-title">{title}</div>
      <div className="confirmEmail-message">{message}</div>
      {success ? (
        <BsFillCheckCircleFill className="confirmEmail-icon" />
      ) : (
        <MdOutlineError className="confirmEmail-icon" />
      )}
      <button className="confirmEmail-btn" onClick={() => history.push("/")}>
        Go to home
      </button>
    </div>
  );
};

export default ConfirmEmail;
