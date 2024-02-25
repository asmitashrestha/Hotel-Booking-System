import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from "@chakra-ui/tooltip";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Input } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { IoMdNotifications } from "react-icons/io";
import { useChatState } from "../../contexts/ChatProvider";
import { useDisclosure } from "@chakra-ui/hooks";
import { useNavigate } from 'react-router-dom';
import Chatloading from './Chatloading';
import Userlist from './Userlist';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false); // Corrected state initialization
  const { user, chats, setChats, setSelectedChat } = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  // const logoutHandler = () => {
  //   localStorage.removeItem("userInfo");
  //   navigate('/');
  // };

  const showUserInfo = () => {
    navigate('/profile');
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please enter something!");
      return;
    }

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user || !user.token) {
        console.error("User info or token is missing.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("sidebar",config);
      

      const { data } = await axios.get(`http://localhost:5000/api/users/register?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to Load the Results");
    }
  };


  

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user || !user.token) {
        console.error("User info or token is missing.");
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("sidebar",config);
      
      const { data } = await axios.post(`http://localhost:5000/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);
      
      toast.error('Error fetching the chat');
    }
  };

 
  

  return (
    <div className='boxcontainer'>

      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost" onClick={onOpen}>
          <FaSearch />
          <Text display={{ base: "none", md: "flex" }} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <div className="userdetail">
        <div className="title-chats justify-center text-center text-2xl ">
          <p>Chit-Chat</p>
        </div>

        <div className="tit-chat flex space-between">
          <div className="tit-left mr-8">
            <IoMdNotifications className='h-8 w-7' />
          </div>
          <div className="tit-right flex">
            <button onClick={showUserInfo}>
              <img src={user.img} alt="user profile" height='30px' width='41px' className='img-user mr-2' />
            </button>
          </div>
          {/* <button className='logout ml-4' onClick={logoutHandler}>Logout</button> */}
        </div>
      </div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Friend</DrawerHeader>
          <DrawerBody>
            <Box display="flex" paddingBottom={2}>
              <Input
                placeholder="Search by name or email"
                marginRight={1}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}><FaSearch /></Button>
            </Box>
            {loading ? (
              <Chatloading />
            ) : (
              searchResult?.map((user) => (
                <Userlist
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner marginLeft="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <hr className='line' />
    </div>
  );
};

export default Sidebar;
