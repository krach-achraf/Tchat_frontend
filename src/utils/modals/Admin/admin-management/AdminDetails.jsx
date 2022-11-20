import React from 'react'
import Axios from 'axios';
import {useEffect, useState} from 'react';

import '../admin-management/AdminDetails.css'

import {FaRegWindowClose} from 'react-icons/fa'

const AdminDetails = adminDetails => {

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
        return(
            <ul>
                <li>Full name : {data.name}</li>
                <li>Username : {data.username}</li>
                <li>Email : {data.email}</li>
                <li>Phone : {data.phone}</li>
            </ul>
        )
    })

    if(!adminDetails.show){
        return null;
    }  

    return (
        <div className="admin-details-modal">
        <div className="admin-detials-content">
            <div className="admin-details-header">
                <h3 className="header-title">Admin details</h3>
                <button className="btn-modal-close">
                    <FaRegWindowClose onClick={adminDetails.onClose}/>
                </button>
            </div>
            <div className="admin-details-modal-body">
                {arr}
            </div>
        </div>
    </div>
    )
}

export default AdminDetails