import { useState } from "react";
import { useChatState } from "../contexts/ChatProvider";
import Sidebar from "../components/chatbox/Sidebar";
import Mychat from "../components/chatbox/Mychat";
import Chatcontainer from "../components/chatbox/ChatContainer";

const Chats = () => {
  const { user } = useChatState(); // Call ChatState as a function

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div>
      <h1>hello from chat new</h1>
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
