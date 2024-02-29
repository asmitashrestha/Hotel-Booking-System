import { Box, Stack, Text } from "@chakra-ui/layout";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "../chatbox/ChatLogics";
import ChatLoading from "../chatbox/Chatloading";
import { ChatState } from "../../contexts/ChatProvider";
import Groupchat from "./Groupchat";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const isSelected = selectedChat 


  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/chat", config);
      setChats(data);
    } catch (error) {
      toast.error('Failed to load chats')
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
          <button className="flex  relative start-32 bottom-14  p-1  text-xl bold hover:text-white hover:bg-blue-400 rounded-lg mt-4"
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