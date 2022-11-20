import React from 'react';
import Axios from 'axios';
import {useEffect, useState} from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import AdminHeader from '../../../../components/admin/AdminHeader'
import AdminPannel from '../../../../components/admin/AdminPannel'
import UserDetails from '../../../../utils/modals/Admin/user-management/UserDetails'

import '../user-management/UserManagement.css';

const UserManagement = () =>{

    const [UDetails, setUDetails] = useState(false)

    const [data, setData] = useState([])

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            console.log("getting from", res.data)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, []) 

    const arr = data.map((data, index) => {
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>
                    <button className="btn-details-user" onClick={() => setUDetails(true)}>Details</button>
                    <UserDetails onClose={() => setUDetails(false)} show={UDetails}/>
                    <button className="btn-delete-user">Ban</button>
                </td>
            </tr>
        )
    })

    return(

        <div className="user-management">
            <AdminHeader/>
            <AdminPannel/>
            <div className="user-management-space">
                <h2>Manage your users here.</h2>
                <form action="" className="user-filter">
                    <input type="text" className="user-filter-input" placeholder="Look for a user..." />
                    <button className="btn-user-filter">search</button>
                </form>
                <div className="users-table-display">
                    <table className="users-table">
                        <tr>
                            <th>Id</th>
                            <th>Full name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                       {arr}
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

export default UserManagement;