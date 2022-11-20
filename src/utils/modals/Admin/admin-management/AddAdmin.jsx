import React from 'react'
import {useEffect, useState} from 'react';

import '../admin-management/AddAdmin.css';
import {FaRegWindowClose} from 'react-icons/fa'

const AddAdmin = addAdmin => {

    if(!addAdmin.show){
        return null
    }

    return (
        <div className="admin-add-modal">
                <div className="admin-add-content">
                    <div className="admin-add-header">
                        <h3 className="header-title">Add admin</h3>
                        <button className="btn-modal-close">
                            <FaRegWindowClose onClick={addAdmin.onClose}/>
                        </button>
                    </div>
                    <div className="admin-add-modal-body">
                        <form action="" className="add-admin-form">
                            <div className="admin-add-inputs">
                                <input type="text" className="add-admin-fields" placeholder="Full name" />
                                <input type="text" className="add-admin-fields" placeholder="Email" />
                            </div>
                            <div className="admin-add-inputs">
                                <input type="email" className="add-admin-fields" placeholder="Username" />
                                <input type="email" className="add-admin-fields" placeholder="Phone number" />
                            </div>
                            <div className="admin-add-inputs">
                                <input type="password" className="add-admin-fields" placeholder="Password" />
                                <input type="password" className="add-admin-fields" placeholder="Confirm password" />
                            </div>
                            <button type="submit" className="btn-add-admin">+ ADD ADMIN</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default AddAdmin