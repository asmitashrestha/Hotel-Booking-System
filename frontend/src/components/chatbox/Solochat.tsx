import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Groupchatupdate from "./Groupchatupdate";
import Scrollbar from "./Scrollbar";
import Lottie from "react-lottie"; // Import Lottie from react-lottie
import animationData from "../anima/typing.json";
import { useChatState } from "../../contexts/ChatProvider";
import { getUser, getUserInfo } from "./ChatLogics";
import { FaChevronCircleLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const Solochat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } = useChatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        // headers: {
        //   Authorization: `Bearer ${user.token}`,
        // },
        credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      // Handle error
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        // Handle error
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  }, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="text-lg md:text-xl pb-3 px-2 w-full flex justify-between items-center">
            <button className="md:hidden" onClick={() => setSelectedChat("")}>
              <FaChevronCircleLeft />
            </button>
            {messages && !selectedChat.isGroupChat ? (
              <>
                {getUser(user, selectedChat.users)}
                <button onClick={() => getUserInfo(user, selectedChat.users)}>
                  <CgProfile />
                </button>
              </>
            ) : (
              <>
                {selectedChat.messageName.toUpperCase()}
                <Groupchatupdate
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </div>
          <div className="flex flex-col justify-end p-3 bg-gray-300 w-full h-full rounded-lg overflow-hidden">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin">Loading...</div>
              </div>
            ) : (
              <div className="messages">
                <Scrollbar messages={messages} />
              </div>
            )}

            <div className="mt-3">
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={70}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <input
                className="bg-gray-200 p-2 w-full rounded"
                type="text"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={sendMessage}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl">Click on a user to start chatting</p>
        </div>
      )}
    </>
  );
};

export default Solochat;
