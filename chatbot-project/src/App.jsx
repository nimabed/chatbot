import { useState } from 'react';
import { MessageBox } from './components/MessageBox';
import ChatMessages from './components/ChatMessages';
import './App.css';



function App() {

  const [chatMessages, setChatMessages] = useState([]);

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
