import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './chat'; // Assuming Chat component is exported correctly
import "../index.css"

const socket = io('http://localhost:5000');

function ChatPage() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="flex text-center justify-center">
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3 className='flex justify-center text-xl text-gray-900'>Join Chat</h3>
          <input type='text' placeholder='Ram...' onChange={(e) => { setName(e.target.value) }} className='px-40'/>
          <input type='text' placeholder='Room ID...' onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </div>
  );
}

export default ChatPage;
