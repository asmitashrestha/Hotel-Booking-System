// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ChatContext = createContext(null);

// const ChatProvider = ({ children }) => {
//   const [selectedChat, setSelectedChat] = useState(null); // Set initial value
//   const [user, setUser] = useState(null); // Set initial value
//   const [notification, setNotification] = useState([]);
//   const [chats, setChats] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setUser(userInfo);
//   }, [navigate]);

//   return (
//     <ChatContext.Provider
//       value={{
//         selectedChat,
//         setSelectedChat,
//         user,
//         setUser,
//         notification,
//         setNotification,
//         chats,
//         setChats,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChatState = () => {
//   return useContext(ChatContext);
// };

// export default ChatProvider;

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for your context
type ChatContextType = {
  selectedChat: any; // Adjust the type according to your requirements
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  user: any; // Adjust the type according to your requirements
  setUser: React.Dispatch<React.SetStateAction<any>>;
  notification: any[]; // Adjust the type according to your requirements
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  chats: any[]; // Adjust the type according to your requirements
  setChats: React.Dispatch<React.SetStateAction<any[]>>;
};

const defaultValue: ChatContextType = {
  selectedChat: undefined,
  setSelectedChat: () => {},
  user: undefined,
  setUser: () => {},
  notification: [],
  setNotification: () => {},
  chats: [],
  setChats: () => {},
};

const ChatContext = createContext(defaultValue);

interface ChatProviderProps {
  children: ReactNode; // Define children prop
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<any>(null); // Set initial value
  const [user, setUser] = useState<any>(null); // Set initial value
  const [notification, setNotification] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
