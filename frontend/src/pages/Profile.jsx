import React from 'react'
import { ChatState } from '../contexts/ChatProvider';

const Profile = () => {
    const { user } = ChatState(); 
  return (
    <div className=''>
       <div className='profile-container'>
        <div className="pro-contain">
            <h2>{user.name}</h2>
            <img src={user.img} name={user.name} alt="user profile" height='40px' width='130px' />
            <p>{user.email}</p>
            yoyoyo
        </div>
       
    </div> 
    </div>
    
  )
}

export default Profile
