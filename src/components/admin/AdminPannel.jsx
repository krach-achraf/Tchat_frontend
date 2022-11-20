import React from 'react';

import { MdReportProblem } from "react-icons/md";
import { ImHome3, ImUserTie, ImUsers, ImCog } from "react-icons/im";

import '../admin/AdminPannel.css'

const AdminPannel = () => {
    return (
        <div className="admin-pannel">
            <a href="/admin_home" className="admin-pannel-links"> <ImHome3/> <br /> Home </a>
            <a href="/admin_user_management" className="admin-pannel-links"> <ImUsers/> <br /> User management </a>
            <a href="/admin_admins_management" className="admin-pannel-links"> <ImUserTie/> <br /> Admin management </a>
            <a href="/reports" className="admin-pannel-links"> <MdReportProblem/> <br /> Reports </a>
            <a href="/admin_settings" className="admin-pannel-links"> <ImCog/> <br /> Settings </a>
        </div>
    )
}

export default AdminPannel;