
const Userlist = ({user,handleFunction}) => {
  return (
    <div onClick={handleFunction}>
        <div className="chatcontainer">
             <div className="chatlist">
            <h2>{user.name}</h2>
            <img src={user.img}  alt="user profile" height='60px' width='70px'  />
            <p>email:{user.email}</p>
        </div>
        </div>
       
      
    </div>
  )
}

export default Userlist
