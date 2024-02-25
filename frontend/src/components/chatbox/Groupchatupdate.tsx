import { useState } from "react";
import axios from "axios";
import { useChatState } from "../../contexts/ChatProvider";
import UserItem from "./UserItem";
import UserList from './Userlist'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Groupchatupdate = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    user,
    setNotification,
  } = useChatState();

  const handleSearch = async (query) => {
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

      console.log("Group",config);
      
      const { data } = await axios.get(`http://localhost:5000/api/users/register?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      // Handle error
      console.log(error);
      
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      
      };
      const { data } = await axios.put(
        `http://localhost:5000/chat/rename`,
        {
          chatId: selectedChat._id,
          messageName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      // Handle error
      console.log(error)
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (userOne) => {
    if (selectedChat.users.find((u) => u._id === userOne._id)) {
      // Handle user already in group
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      // Handle only admins can add someone
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      
      };
      const { data } = await axios.put(
        `http://localhost:5000/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: userOne._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
      
      // Handle error
      setLoading(false);
    }
  };

  const handleRemove = async (userOne) => {
    if (selectedChat.groupAdmin._id !== user._id && userOne._id !== user._id) {
      // Handle only admins can remove someone
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
     
      };
      const { data } = await axios.put(
        `http://localhost:5000/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userOne._id,
        },
        config
      );

      userOne._id === user._id ? setSelectedChat(data) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error)
      // Handle error
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        {/* Replace with your icon */}
      </button>

      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedChat.messageName}
                </h3>

                <div className="flex flex-wrap pb-3">
                  {selectedChat.users.map((u) => (
                    <UserItem
                      key={u._id}
                      user={u}
                      admin={selectedChat.groupAdmin}
                      handleFunction={() => handleRemove(u)}
                    />
                  ))}
                </div>

                <div className="flex">
                  <input
                    type="text"
                    className="bg-gray-100 px-3 py-2 rounded-l"
                    placeholder="Chat Name"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <button
                    className="bg-teal-500 text-white px-4 py-2 rounded-r"
                    onClick={handleRename}
                  >
                    Update
                  </button>
                </div>

                <input
                  type="text"
                  className="bg-gray-100 px-3 py-2 mt-2 w-full"
                  placeholder="Add User to group"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                {loading ? (
                  <div className="mt-2">
                    <Skeleton count={5}/>
                  </div>
                ) : (
                  searchResult?.map((user) => (
                    <UserList
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Leave Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Groupchatupdate;
