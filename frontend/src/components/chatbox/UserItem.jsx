const UserItem = ({ user, handleFunction, admin }) => (
  <div className="inline-block bg-purple-500 text-white px-2 py-1 rounded-lg m-1 mb-2 cursor-pointer" onClick={handleFunction}>
    {user.name}
    {admin === user._id && <span className="ml-1">(Admin)</span>}
    <span className="ml-1">&#10006;</span>
  </div>
);

export default UserItem;
