import React, { useEffect, useState } from 'react';
import {BsPlayFill} from 'react-icons/bs';
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,name,room}) {
    const [currentMessage, setCurrentMessage]=useState("")
    const [messageList, setMessageList]=useState([])


    const sendMessage=async()=>{
        if(currentMessage!==""){
            const messageData={
                room:room,
                author:name,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            }

            await socket.emit("send_message",messageData)
            setMessageList((list)=>[...list, messageData])
            setCurrentMessage("")

        }
    }

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
    
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);

    return (
        <div className='chat-window'>
            <div className='py-4 rounded bg-pink-900'>
                <p className='text-xl font-bold text-white '>Live Chat</p>
            </div>
            <div className='chat-body rounded bg-blue-200 '>
            <ScrollToBottom className='message-container'>
                {messageList.map((messageContent, index) => {
                    return (
                        <div className='message' id={name === messageContent.author ? "you" : "other"} key={index}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{messageContent.time}</p>
                                    <p id='author'>{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ScrollToBottom>

            </div>
            <div className='chat-footer'>
                <input type='text' value={currentMessage} placeholder='Hello...' onChange={(e)=>{setCurrentMessage(e.target.value)}}
                 onKeyUp={(e)=>{e.key==="Enter" && sendMessage()}}/>
                <button onClick={sendMessage}><BsPlayFill /></button>
            </div>

        </div>
  );
}

export default Chat;


