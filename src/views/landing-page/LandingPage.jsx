import React from 'react';
import LanginPageNavbar from '../../components/LandingPage/Header/LandingPageNavbar'
import '../../views/landing-page/LandingPage.css'
const LandingPage = () => {
    return ( 
        <div className="container">
            <div className="main-header">
                <LanginPageNavbar/> 
            </div>
        </div>
     );
}
 
export default LandingPage;