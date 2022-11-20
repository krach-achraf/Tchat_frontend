import React from 'react';

import '../../admin/auth/AdminAuth.css'

const AdminAuth = () =>{
    return (
        <div className="adminauth-container">
            <h2>Welcome back</h2>
            <h4>This page is restricted for admins only.</h4>
            <form action="">
                <div className="adminauth-fields">
                    <input type="text" placeholder="enter your username" className="admin-auth-inputs" />
                </div>
                <div className="adminauth-fields">
                    <input type="password" placeholder="enter your password" className="admin-auth-inputs" />
                </div>
                <button type="submit" className="btn-admin-auth">Sign in</button>
            </form>
        </div>
    )
}

export default AdminAuth;