import { useState, useEffect } from 'react';
import {Chatbot} from 'supersimpledev';
import { MessageBox } from './components/MessageBox';
import ChatMessages from './components/ChatMessages';
import './App.css';


function App() {
  const [chatMessages,
         setChatMessages
        ] = useState(
          JSON.parse(localStorage.getItem('messages')) || []
        );

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);


  useEffect(() => {
    Chatbot.addResponses({
      'weather': 'Today is clear and sunny'
    });
  },[]);

  
  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <MessageBox 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
