
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import {
  useDisclosure,
} from "@chakra-ui/react";
import { ChatState } from "../../contexts/ChatProvider";
import Userlist from './Userlist';
import UserItem from './UserItem';

const Groupchat = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = ChatState();

  const groupHandler = (addUser) => {
    if (selectedUsers.includes(addUser)) {
      toast.warning("User already in group") 
      return;
    }

    setSelectedUsers([...selectedUsers, addUser]);
  };

  const searchUser = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/users?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load Results")
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Please fill all the fields");
      return;
    }
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast.success("Group chat created successfully!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <div className={`fixed top-0 left-0 w-full h-full ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50">
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded">
        <div className="text-3xl font-bold text-center mb-4">Create Group Chat</div>
        <div className="mb-4">
          <label htmlFor="groupChatName" className="block text-sm font-medium text-gray-700">Group Chat Name</label>
          <input
            type="text"
            id="groupChatName"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Group Chat Name"
            onChange={(e) => setGroupChatName(e.target.value)}
          />
        </div>
    
        <div className="mb-4">
          <label htmlFor="addUsers" className="block text-sm font-medium text-gray-700">Add Users in Group</label>
          <input
            type="text"
            id="addUsers"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Add Users in Group"
            onChange={(e) => searchUser(e.target.value)}
           
          />
        </div>
        <div className="w-full flex flex-wrap mb-4">
          {selectedUsers.map((u) => (
            <UserItem
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          searchResult?.slice(0, 4).map((user) => (
            <Userlist
              key={user._id}
              user={user}
              handleFunction={() => groupHandler(user)}
            />
          ))
        )}
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-4 p-2 border rounded">Close</button>
          <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">Create Chat</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Groupchat;
