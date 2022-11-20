import React from 'react'

import { ImExit } from "react-icons/im";

import '../admin/AdminHeader.css'

const AdminHeader = () => {
  return (
    <div className="admin-header">
        <h3 className="admin-greet">Welcome back</h3>
        <div className="admin-logout-div">
            <a href="" className="admin-logout"><ImExit/></a>
            <div className="admin-logout-tooltip">
                <span className="admin-logout-tooltip-text">Log out</span>
            </div>
        </div>
        
    </div>
  )
}

export default AdminHeader