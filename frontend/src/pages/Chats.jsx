import { useState } from "react";
import { ChatState } from "../contexts/ChatProvider";
import Sidebar from "../components/chatbox/Sidebar";
import Mychat from "../components/chatbox/Mychat";
import Chatcontainer from "../components/chatbox/Chatcontainer";

const Chats = () => {
  const { user } = ChatState(); // Call ChatState as a function

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div>
      {user && <Sidebar />}
      <div className="box-container">
        {user && <Mychat fetchAgain={fetchAgain} />}
        {user && (
          <Chatcontainer fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
}

export default Chats;
