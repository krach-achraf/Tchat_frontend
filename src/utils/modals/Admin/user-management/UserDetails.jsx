import React from 'react'
import Axios from 'axios';
import {useEffect, useState} from 'react';

import {FaRegWindowClose} from 'react-icons/fa'

import '../user-management/UserDetails.css'

const UserDetails = userDetails => {

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

    if(!userDetails.show){
        return null;
    }

    return (
        <div className="user-details-modal">
            <div className="user-detials-content">
                <div className="user-details-header">
                    <h3 className="header-title">User details</h3>
                    <button className="btn-modal-close">
                        <FaRegWindowClose onClick={userDetails.onClose}/>
                    </button>
                </div>
                <div className="user-details-modal-body">
                    {arr}
                </div>
            </div>
        </div>
    )
}

export default UserDetails