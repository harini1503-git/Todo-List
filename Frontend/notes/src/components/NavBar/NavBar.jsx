import React, { useState } from 'react'
import '../../index.css'
import ProfileInfo from '../profile/ProfileInfo'
import { useNavigate } from 'react-router-dom'

const NavBar = ({userinfo}) => {
    
    const navigate= useNavigate();
    const OnLogout = () => {
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
                <div className="container">
                    <a className="navbar-brand" href="#">Todo - List</a>
                    {userinfo && <ProfileInfo userinfo={userinfo} OnLogout={OnLogout} />}
                </div>
            </nav>
        </>
    )
}

export default NavBar