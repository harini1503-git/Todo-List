import React from 'react'
import '../../index.css'
import { getInitials } from '../../utils/helper'
import { useAppContext } from '../../context/AppContext'

const ProfileInfo = ({ OnLogout}) => {

  const {user}= useAppContext();
  // const navigate= useNavigate;
  return (
    <>
        <div className='profile-container'>
            <div className='profile-round'>{getInitials(user?.fullname)}</div>
            <div className='profile-des'>
                <p>{user && user.fullname}</p>
                <button onClick={OnLogout} className='btn btn-primary'>Logout</button>
            </div>
        </div>
    </>
  )
}

export default ProfileInfo