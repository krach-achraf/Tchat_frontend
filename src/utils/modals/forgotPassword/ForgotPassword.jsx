import React, { useState, useCallback } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Axios from "axios";

import { base_url_ms_auth } from "../../constants/Constants";
import "./ForgotPassword.css";

const ForgotPassword = (props) => {
  const [showEmail, setShowEmail] = useState(true);
  const [showCodeVerific, setShowCodeVerific] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [codeVerific, setCodeVerific] = useState();
  const [codeVerificUser, setCodeVerificUser] = useState("");
  const [email, setEmail] = useState("");
  const [titleError, setTitleError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSended, setIsSended] = useState(true);

  const validPassword = new RegExp(
    "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
  );

  const sendMail = useCallback(async () => {
    if (email !== "") {
      let code = Math.floor(1000 + Math.random() * 99999);
      setCodeVerific(code);
      setIsSended(false);
      try {
        await Axios.get(
          `${base_url_ms_auth}forgotPassword/mail/${email}/${code}`
        );
        setShowEmail(false);
        setShowCodeVerific(true);
      } catch (error) {
        if (error.response.status == 404) setError("Email not found!");
        else setError("Sorry, something went wrong!");
      }
      setIsSended(true);
    }
  });

  const verificateCode = useCallback(() => {
    if (codeVerificUser !== "") {
      if (codeVerificUser == codeVerific) {
        setShowPassword(true);
        setShowCodeVerific(false);
        setCodeVerificUser("");
        setCodeVerific();
      } else setError("The verivication code is incorrect!");
    }
  });

  const changePassword = useCallback(async () => {
    const valid = true;


      if (password !== "" && !validPassword.test(password)) {
      setError("Password not valid!");
      valid = false;
    }
    

    if (confirmPassword !== "" && password != confirmPassword) {
      setError("Confirm password not valid!");
      valid = false;
    }

    if (password !== "" && confirmPassword !== "") {
      if (valid) {
        try {
          await Axios.put(
            `${base_url_ms_auth}forgotPassword/changePassword/${email}/${password}`
          );
          props.onClose();
          setPassword("");
          setEmail("");
          setConfirmPassword("");
          setShowPassword(false);
          setShowEmail(true);
        } catch (error) {
          setError("Sorry, something went wrong!");
        }
      }
    }
  });

  const setError = useCallback((title) => {
    setIsError(true);
    setTitleError(title);
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  });

  return (
    <>
      {props.show ? (
        <div className="forgotPassword-modal">
          <div className="forgotPassword-modal-content">
            <div className="forgotPassword-modal-header">
              <h3 className="forgotPassword-modal-title">Forgot Password</h3>
              <button className="modal-btn-close">
                <FaRegWindowClose onClick={props.onClose} />
              </button>
            </div>
            <div className="forgotPassword-modal-body">
              {!isSended ? <div className="loader"></div> : null}
              {isError ? (
                <div className="forgotPassword-error">{titleError}</div>
              ) : null}
              {showEmail ? (
                <input
                  type="email"
                  placeholder="Email"
                  className="forgotPassword-text-fields"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : null}
              {showCodeVerific ? (
                <input
                  type="number"
                  placeholder="Verification code"
                  className="forgotPassword-text-fields"
                  value={codeVerificUser}
                  onChange={(e) => setCodeVerificUser(e.target.value)}
                />
              ) : null}
              {showPassword ? (
                <>
                  <input
                    type="password"
                    placeholder="New password"
                    className="forgotPassword-text-fields"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="forgotPassword-text-fields"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              ) : null}
              <div className="forgotPassword-buttons">
                <button
                  className="forgotPassword-btnBack"
                  onClick={() => {
                    if (showCodeVerific) {
                      setShowCodeVerific(false);
                      setShowEmail(true);
                    }
                    if (showPassword) {
                      setShowPassword(false);
                      setShowCodeVerific(true);
                    }
                  }}
                >
                  Back
                </button>
                <button
                  className="forgotPassword-btnRegister"
                  onClick={() => {
                    if (showEmail) sendMail();
                    if (showCodeVerific) verificateCode();
                    if (showPassword) changePassword();
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ForgotPassword;
