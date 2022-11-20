import React from 'react';
import {useRef} from 'react';
import { useState } from 'react';

import '../../../utils/css/main.css'
import '../Header/LandingPageNavbar.css'

import {FaBars, FaTimes} from 'react-icons/fa'
import SigninModal from '../../../utils/modals/LandingPage/SigninModal'
import ForgotPassword from '../../../utils/modals/forgotPassword/ForgotPassword';

const LanginPageNavbar = () => {

   const navRef = useRef();
   const [showForgPassModal, setShowForgPassModal] = useState(false);
   const [signin, setSignin] = useState(false)

   const showNavbar = () => {
      navRef.current.classList.toggle('responsive_nav');
   }

    return (
       <header>
         <h1>TCHAT</h1>
         <nav ref={navRef} className="navbar-items">
            <a href="" className="nav-links">Home</a>
            <a href="" className="nav-links">Product</a>
            <a href="" className="nav-links">About</a>
            <a href="" className="nav-links">Contact</a>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
               <FaTimes/>
            </button>
            <button className="btn-signin-modal" onClick={() => setSignin(true)}>sign in</button>
            <SigninModal setShowForgPassModal={setShowForgPassModal} onClose={() => setSignin(false)} show={signin} />
         </nav>
         <button className="nav-btn" onClick={showNavbar}>
            <FaBars/>
         </button>
         <ForgotPassword show={showForgPassModal} onClose={() => setShowForgPassModal(false)} />
       </header>
     );
}
 
export default LanginPageNavbar;