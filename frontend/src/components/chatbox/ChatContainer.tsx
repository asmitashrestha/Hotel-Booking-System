import { useChatState } from "../../contexts/ChatProvider";
import Solochat from "./Solochat";

const Chatcontainer = ({ fetchAgain, setFetchAgain }: any) => {
  const { selectedChat }: { selectedChat: any } = useChatState() || { selectedChat: null }; // Provide a default value if useChatState() returns null or undefined

  return (
    <div
      className={`${
        selectedChat? "flex" : "hidden"
      } md:flex items-center flex-col p-3 bg-white w-full md:w-68% border rounded-lg border-gray-300`}
    >
      <Solochat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatcontainer;
