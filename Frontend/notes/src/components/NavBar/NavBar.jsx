import React, { useState } from 'react'
import '../../index.css'
import ProfileInfo from '../profile/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useAppContext } from '../../context/AppContext'

const NavBar = () => {

    const {user}= useAppContext();
    
    const navigate= useNavigate();
    const OnLogout = () => {
        axiosInstance.post("/logout");
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
                <div className="container-nav">
                    <a className="navbar-brand" href="/dashboard">Todo - List</a>
                    {user && <ProfileInfo OnLogout={OnLogout} />}
                </div>
            </nav>
        </>
    )
}

export default NavBar