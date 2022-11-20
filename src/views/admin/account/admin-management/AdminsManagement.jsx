import React from 'react';
import Axios from 'axios';
import {useEffect, useState} from 'react';

import '../admin-management/AdminsManagement.css';

import AdminHeader from '../../../../components/admin/AdminHeader'
import AdminPannel from '../../../../components/admin/AdminPannel'

import AdminDetails from '../../../../utils/modals/Admin/admin-management/AdminDetails'
import AddAdmin from '../../../../utils/modals/Admin/admin-management/AddAdmin'
const AdminsManagement = () =>{

    const [ADetails, setADetails] = useState(false);
    const [addAmin, setAddAdmin] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            console.log("getting from", res.data)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, []) 

    const arrAdmin = data.map((data, index) => {
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>lorem</td>
                <td>
                    <button className="btn-admin-details" onClick={() => setADetails(true)}>Details</button>
                    <AdminDetails onClose={() => setADetails(false)} show={ADetails}/>
                    <button className="btn-admin-privilege">Grant privilege</button>
                    <button className="btn-admin-delete">Delete</button>
                </td>
            </tr>
        )
    })


    return(
        <div className="admins-management">
            <AdminHeader/>
            <AdminPannel/>
            <div className="admin-management-space">
                <h2>Manage your admins here.</h2>
                <div className="admin-management-tools">
                     <form action="" className="admin-filter">
                        <input type="text" className="admin-filter-input" placeholder="Look for a user..." />
                        <button className="btn-admin-filter">search</button>
                    </form>
                    <button className="btn-add-admins" onClick={() => setAddAdmin(true)}>+ Add admin</button>
                    <AddAdmin onClose={() => setAddAdmin(false)} show={addAmin}/>
                </div>
               
                <div className="admin-table-display">
                    <table className="admin-table">
                        <tr>
                            <th>Id</th>
                            <th>Full name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                        {arrAdmin}
                       
                    </table>
                    <div className="list-pagination">
                        <button className="btn-previous">Previous</button>
                        <button className="btn-next">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminsManagement;