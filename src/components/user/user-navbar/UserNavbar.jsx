import React from 'react'

import '../user-navbar/UserNavbar.css'

import { ImHome, ImBell, ImEarth } from "react-icons/im";

const UserNavbar = () => {
  return (
    <div className="user-navbar">
        <form action="" className="user-nav-search">
            <input type="text" className="user-search-input" placeholder="Search something..." />
        </form>
        <ul className="user-navigation">
            <li className="user-nav-links">
                <a href="" className="user-nav-link">
                    <ImBell className="user-nav-icons"/>
                    <caption className="user-nav-links-caption">Notifications</caption>  
                </a>
            </li>
            <li className="user-nav-links">
                <a href="" className="user-nav-link">
                    <ImEarth className="user-nav-icons"/>
                    <caption className="user-nav-links-caption">Explore</caption>
                </a>
            </li>
            <li className="user-nav-links">
                <a href="" className="user-nav-link">
                    <ImHome className="user-nav-icons"/>
                    <caption className="user-nav-links-caption">Feed</caption>
                </a>
                
            </li>
        </ul>
   </div>
  )
}

export default UserNavbar