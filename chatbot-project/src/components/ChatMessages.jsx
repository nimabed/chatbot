import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css';


// Custom hook
function useAutoScroll(dependencies) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const chatMessagesElem = chatMessagesRef.current;
    if (chatMessagesElem) {
      chatMessagesElem.scrollTop = chatMessagesElem.scrollHeight;
    }
  },[dependencies]);

  return chatMessagesRef;

}


function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div className="chat-messages-container"
          ref={chatMessagesRef}>
      
      <h2 
        className={
          chatMessages.length 
          ? 'no-welcome' 
          : 'show-welcome'
        }>Welcome, Ask anything from box below.
      </h2>

      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            time = {chatMessage.time}
            key = {chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;