import { useChatState } from '../contexts/ChatProvider';

const Profile = () => {
    const { user } = useChatState(); 
  return (
    <div className=''>
       <div className='profile-container'>
        <div className="pro-contain">
            <h2>{user.name}</h2>
            <img src={user.img}  alt="user profile" height='40px' width='130px' />
            {/* <img src={user.img} name={user.name} alt="user profile" height='40px' width='130px' /> */}
            <p>{user.email}</p>
            
        </div>
       
    </div> 
    </div>
    
  )
}

export default Profile
