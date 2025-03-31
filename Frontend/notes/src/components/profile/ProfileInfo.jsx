import React from 'react'
import '../../index.css'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userinfo, OnLogout}) => {

  // const navigate= useNavigate;
  return (
    <>
        <div className='profile-container'>
            <div className='profile-round'>{getInitials(userinfo?.fullname)}</div>
            <div className='profile-des'>
                <p>{userinfo && userinfo.fullname}</p>
                <button onClick={OnLogout} className='btn btn-primary'>Logout</button>
            </div>
        </div>
    </>
  )
}

export default ProfileInfo