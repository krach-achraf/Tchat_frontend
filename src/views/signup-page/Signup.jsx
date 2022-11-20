import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import "../signup-page/Signup.css";
import { base_url_ms_auth } from "../../utils/constants/Constants";
import { useCallback } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [isFinished, setIsFinished] = useState(true);
  const [errorUser, setErrorUser] = useState(false);
  const [successUser, setSuccesUser] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorFullname, setErrorFullname] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const validEmail = new RegExp("^[a-z0-9]+@[a-z]+.[a-z]{2,3}$");

  const validUsername = new RegExp(
    "^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\\d._-]{2,50}$"
  );

  const validFullname = new RegExp(
    "^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)$"
  );

  const validPassword = new RegExp(
    "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
  );

  const history = useHistory();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    let dataValid = true;

    if (!validEmail.test(email)) {
      setErrorEmail(true);
      setTimeout(() => setErrorEmail(false), 5000);
      dataValid = false;
    }

    if (!validFullname.test(fullname)) {
      setErrorFullname(true);
      setTimeout(() => setErrorFullname(false), 5000);
      dataValid = false;
    }

    if (!validPassword.test(password)) {
      setErrorPassword(true);
      setTimeout(() => setErrorPassword(false), 5000);
      dataValid = false;
    }

    if (!validUsername.test(username)) {
      setErrorUsername(true);
      setTimeout(() => setErrorUsername(false), 5000);
      dataValid = false;
    }

    if (password !== passwordComfirm) {
      setErrorConfirmPassword(true);
      setTimeout(() => setErrorConfirmPassword(false), 5000);
      dataValid = false;
    }

    if (dataValid) {
      try {
        setIsFinished(false)
        await Axios.post(
          `${base_url_ms_auth}sign-up`,
          {
            email,
            fullname,
            username,
            password,
            gender,
            profession,
          }
        );
        setEmail('')
        setFullname('')
        setUsername('')
        setPassword('')
        setPasswordComfirm('')
        setGender('')
        setProfession('')
        setSuccesUser(true)
        setTimeout(() => setSuccesUser(false), 10000);
      } catch (error) {
        console.log(error)
        if(error.response.data == 'User already exist')
            setTitleError('Username or email already used!')
        else
            setTitleError('Sorry, something went wrong!')
        setErrorUser(true);
        setTimeout(() => setErrorUser(false), 5000);
      }
      setIsFinished(true)
    }
  }) 

  const particlesInit = async (main) => {
    //console.log(main);
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    //console.log(container);
  };

  return (
    <div className="signup-container">
      <div className="signup-main">
        <div className="signup-header">
          <div className="header-left">
            <h4 className="signup-title1">Create your account.</h4>
            <h4 className="signup-title2">
              Your <small>journey</small> starts here!
            </h4>
          </div>
          <button className="btn-goback" onClick={() => history.push("/")}>
            GO BACK
          </button>
        </div>
        <div className="signup-body">
          {!isFinished ? <div className="loader"></div> : null}
            {errorUser ? <p className="errorUser">{titleError}</p> : null}
            {successUser ? <p className="successUser">Your account has been successfully registered, we sent you a confimation email.</p> : null}
          <form action="" className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-inputs">
              <div className="signup-inputs-email">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-signup-fields"
                />
                {errorEmail ? (
                  <span className="errorField">Email not valid</span>
                ) : null}
              </div>
            </div>
            <div className="signup-inputs">
              <div className="signup-inputs-fullname">
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="signup-fields fullname-signup-fields"
                />
                {errorFullname ? (
                  <span className="errorField">Full name not valid</span>
                ) : null}
              </div>
              <div className="signup-inputs-username">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="signup-fields"
                />
                {errorUsername ? (
                  <span className="errorField">Usename not valid</span>
                ) : null}
              </div>
            </div>
            <div className="signup-inputs ">
              <div className="signup-inputs-password">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="signup-fields password-signup-fields"
                />
                {errorPassword ? (
                  <span className="errorField">Password not valid</span>
                ) : null}
              </div>
              <div className="signup-inputs-confirmPassword">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="signup-fields"
                  value={passwordComfirm}
                  onChange={(e) => setPasswordComfirm(e.target.value)}
                />
                {errorConfirmPassword ? (
                  <span className="errorField">Confirm password not valid</span>
                ) : null}
              </div>
            </div>
            <div className="signup-inputs">
              <select
                name="gender"
                className="signup-fields gender-signup-fields"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                name="profession"
                className="signup-fields profession-signup-fields"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              >
                <option disabled value="">
                  Profession
                </option>
                <option value="Computer engineer">Computer engineer</option>
                <option value="UX UI designer">UX UI designer</option>
                <option value="Data scientist">Data scientist</option>
              </select>
            </div>
            <button
              type="submit"
              className="signup-btn"
              disabled={
                !email ||
                !fullname ||
                !username ||
                !password ||
                !passwordComfirm ||
                !gender ||
                gender == "" ||
                !profession ||
                profession == ""
              }
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#040C0A",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#fff",
            },
            links: {
              color: "#9932cc",
              distance: 250,
              enable: true,
              opacity: 0.5,
              width: 0.5,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Signup;
