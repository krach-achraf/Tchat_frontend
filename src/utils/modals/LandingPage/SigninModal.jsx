import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "../LandingPage/SigninModal.css";
import Axios from "axios";
import {
  base_url_ms_auth,
  base_url_ms_users,
} from "../../constants/Constants";

const SigninModal = (signin) => {
  const history = useHistory();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);

  if (!signin.show) {
    return null;
  }

  return (
    <>
      <div className="signin-modal">
        <div className="signin-modal-content">
          <div className="signin-modal-header">
            <h3 className="signin-modal-title">Sign in</h3>
            <button className="modal-btn-close">
              <FaRegWindowClose onClick={signin.onClose} />
            </button>
          </div>
          <div className="signin-modal-body">
            <form
              action=""
              className="signin-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  let authToken = await Axios.post(
                    `${base_url_ms_auth}sign-in`,
                    {
                      usernameOrEmail,
                      password,
                    }
                  );
                  sessionStorage.setItem("token", authToken.data.token);
                  let userInfo = await Axios.get(
                    `${base_url_ms_users}user/get/${usernameOrEmail}`
                  );
                  sessionStorage.setItem("user", JSON.stringify(userInfo.data));
                  let authorities = [];
                  if (userInfo.data != null) {
                    for (let i = 0; i < userInfo.data.authorities.length; i++)
                      authorities.push(userInfo.data.authorities[i].authority);
                  }
                  if (authorities.includes("ROLE_ADMIN"))
                    history.push("/admin_home");
                  else history.push("/feed");
                  setUsernameOrEmail("");
                  setPassword("");
                  signin.onClose();
                } catch (error) {
                  if (error.response.status == 403)
                    setTitleError(
                      "Username or email or password are incorrect!"
                    );
                  else setTitleError("Sorry, something went wrong!");
                  setErrorSignIn(true);
                  setTimeout(() => setErrorSignIn(false), 5000);
                }
              }}
            >
              {errorSignIn ? (
                <div className="errorSignIn">{titleError}</div>
              ) : null}
              <div className="signin-inputs">
                <input
                  type="text"
                  placeholder="Username or email"
                  className="text-fields"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </div>
              <div className="signin-inputs signin-inputs-password">
                <input
                  type={hiddenPassword ? "password" : "text"}
                  placeholder="Password"
                  className="text-fields"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {hiddenPassword ? (
                  <AiOutlineEye
                    className="showPassword"
                    onClick={() => setHiddenPassword(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="showPassword"
                    onClick={() => setHiddenPassword(true)}
                  />
                )}
              </div>
              <div className="signin-functionality">
                <div className="signin-remember">
                  <input
                    type="checkbox"
                    className="remember-checkbox"
                    id="remember-checkbox"
                  />
                  <span
                    className="signin-rememberMe"
                    htmlFor="remember-checkbox"
                  >
                    Remember me
                  </span>
                </div>
                <div className="signin-password">
                  <button
                    className="signin-forgotPassword"
                    onClick={() => {
                      signin.onClose();
                      signin.setShowForgPassModal(true);
                    }}
                  >
                    Forgot password ?
                  </button>
                </div>
              </div>
              <button type="submit" className="signin-modal-btn">
                sign in
              </button>
            </form>
          </div>
          <div className="signin-modal-footer">
            <small>
              Don't have an account ?
              <button
                className="link-to-signup"
                onClick={() => history.push("/signup")}
              >
                Sign up.
              </button>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninModal;
