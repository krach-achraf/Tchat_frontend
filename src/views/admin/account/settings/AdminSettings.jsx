import React from 'react';

import '../settings/AdminSettings.css'

import AdminHeader from '../../../../components/admin/AdminHeader'
import AdminPannel from '../../../../components/admin/AdminPannel'

import profileImage from '../../../../assets/img/profile_image.svg'

const AdminSettings = () =>{
    return(
        <div className="admin-settings">
            <AdminHeader/>
            <AdminPannel/>
            <div className="admin-settings-space">
                <h2>Manage your Admin settings.</h2>
                <form action="" className="admin-update-settings">
                    <div className="admin-information">
                        <div className="admin-update-picture">
                            <img src={profileImage} alt="profile_image" width="120px" />
                            <br />
                            <input type="file" className="btn-update-admin-img" />
                        </div>
                        <div className="admin-credentials">
                            <ul>
                                <li>Full name : </li>
                                <li>Username : </li>
                                <li>Email : </li>
                                <li>Gender : </li>
                                <li>Phone number : </li>
                            </ul>
                        </div>
                    </div>
                    <div className="admin-update-inputs">
                        <input type="text" className="admin-update-fields" placeholder="Update your email" />
                        <button className="btn-update-admin-settings">update</button>
                    </div>
                    <div className="admin-update-inputs">
                        <input type="text" className="admin-update-fields" placeholder="Update your username" />
                        <button className="btn-update-admin-settings">update</button>
                    </div>
                    <div className="admin-update-inputs">
                        <input type="text" className="admin-update-fields" placeholder="Update your full name" />
                        <button className="btn-update-admin-settings">update</button>
                    </div>
                    <div className="admin-update-inputs">
                        <input type="password" className="admin-update-fields" placeholder="Update your password" />
                        <button className="btn-update-admin-settings">update</button>
                    </div>
                    <div className="admin-update-inputs">
                        <input type="text" className="admin-update-fields" placeholder="Update your phone number" />
                        <button className="btn-update-admin-settings">update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminSettings;