import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatLogics";
import { ChatState } from "../../contexts/ChatProvider"

const Scrollbar = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div
                className="tooltip"
                style={{ marginRight: "1rem", marginTop: "7px" }}
              >
                <img
                  className="user-image"
                  src={m.sender.img}
                  alt={m.sender.name}
                />
                {/* <span className="user-name">{m.sender.name}</span> */}
              </div>
            )}
            <span
              className="message"
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#1d40db" : "rgb(86, 93, 133)"
                }`,
                color: `${
                  m.sender._id === user._id ? "#ececf0" : "#fbffff"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? "3px" : "10px",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default Scrollbar;
