

import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getUser } from "../chatbox/ChatLogics";
import ChatLoading from "../chatbox/Chatloading";
import { useChatState } from "../../contexts/ChatProvider";
import Groupchat from "./Groupchat";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useChatState();
  const isSelected = selectedChat;

  const fetchChats = async () => {
    try {
      // let user = JSON.parse(localStorage.getItem("userInfo"));
      // if (!user || !user.token) {
      //   console.error("User info or token is missing.");
      //   return;
      // }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("Mychat", user.token);
      console.log(user.name);
      console.log(user.email);
      // console.log(user.password);
      
      

      const response = await fetch("http://localhost:5000/chat", {
        method: "GET",
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      console.log("My chat res",response);
      

      if (response.ok) {
        const data = await response.json();
        setChats(data);
      } else {
        toast.error("Failed to load chats");
      }
    } catch (error) {
      console.log("Error mychat",error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div
      className={`flex flex-col  p-3 bg-white rounded-lg border ${
        selectedChat ? "hidden" : "flex"
      } md:flex`}
    >
      <div className="text-xl mt-2">
        My Chats
        <Groupchat>
          <button className="flex  relative start-32 bottom-14 mt-7 p-1  text-xl bold hover:text-white hover:bg-blue-400 rounded-lg ">
            New Group Chat
            <FaPlus className="ml-2 mt-1 mr-2" />
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
                  isSelected
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-black"
                }`}
                key={chat._id}
              >
                <p>
                  {!chat.isGroupChat
                    ? getUser(loggedUser, chat.users)
                    : chat.messageName}
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

