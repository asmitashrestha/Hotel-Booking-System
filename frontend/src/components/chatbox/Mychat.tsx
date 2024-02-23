import { FaPlus } from "react-icons/fa";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "../chatbox/ChatLogics";
import ChatLoading from "../chatbox/Chatloading";
import { useChatState } from "../../contexts/ChatProvider";
import Groupchat from "./Groupchat";
import { log } from "console";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = useChatState();
  const isSelected = selectedChat 


  // const fetchChats = async () => {
  //   // console.log(user._id);
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
     
  //     };

  //     const { data } = await axios.get("http://localhost:5000/chat", config);
  //     setChats(data);
  //   } catch (error) {
  //     toast.error('Failed to load chats')
  //   }
  // };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  console.log("Token",config);
  
      const response = await axios.get("http://localhost:5000/chat", config);
      if (response.status === 200) {
        setChats(response.data);
      } else {
        toast.error('Failed to load chats');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized access, handle accordingly (e.g., redirect to login)
        console.error('Unauthorized access:', error.response.data.msg);
      } else {
        // Other error, handle accordingly
        console.error('Failed to fetch chats:', error.message);
      }
    }
  };
  

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div className={`flex flex-col  p-3 bg-white rounded-lg border ${selectedChat ? 'hidden' : 'flex'} md:flex`}>
      <div
       className="text-xl mt-2"
      >
        My Chats
        <Groupchat>
          <button className="flex  relative start-32 bottom-14 mt-7 p-1  text-xl bold hover:text-white hover:bg-blue-400 rounded-lg "
          >
            New Group Chat<FaPlus className="ml-2 mt-1 mr-2"/>
          </button>
        </Groupchat>
      </div>
      <div className="flex flex-col bg-white width-full height-full rounded-lg overflow-hidden">
        {chats ? (
          <div className="overflow-y-scroll">
            {chats.map((chat) => (
              <button
                onClick={() => setSelectedChat(chat)}
                className={`block cursor-pointer mt-1 w-80 px-3 py-2 rounded-lg ${
                  isSelected ? "bg-blue-400 text-white" : "bg-gray-200 text-black"
                }`}
                key={chat._id}
              >
                <p>
                  {!chat.isGroupChat
                    ? getUser(loggedUser, chat.users)
                    : chat. messageName}
                </p>
                {chat.newMessage && (
                  <div className="text-xs">
                    <p>{chat.newMessage.sender.name} : </p>
                    {chat.newMessage.content.length > 50
                      ? chat.newMessage.content.substring(0, 51) + "..."
                      : chat.newMessage.content}
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;