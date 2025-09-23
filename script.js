const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);

function MessageBox({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!isLoading) {
      setIsLoading(true);
    
      const userInput = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID()
        }
      ];

      setInputText('');
      setChatMessages([
        ...userInput,
        {
          message: 'loading...',
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
      
      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...userInput,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
      setIsLoading(false);
      
    } else {
      setInputText('');
      console.log('Not allowed!!!');
    }
  }

  async function sendByKey(event) {
    if (event.key === 'Escape') {
      setInputText('');
    } else if (event.key === 'Enter') {
      if (!isLoading) {
        setIsLoading(true);
        const userInput = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ];

        setInputText('');
        setChatMessages([
          ...userInput,
          {
            message: 'loading...',
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
          ...userInput,
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);
        setIsLoading(false);
      } else {
        setInputText('');
        console.log('Not allowed!');
      }
    };
    
  }

  return (
    <div className="message-input-container">
      <input 
        placeholder="Send message to chatbot"
        onChange={saveInputText}
        onKeyDown={sendByKey}
        value={inputText}
        className="text-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      >Send
      </button>
    </div>
  );
}


function ChatMessage({ message, sender }) {
  return (
    <div className={
      sender === 'user' 
      ? 'chat-message-user' 
      : 'chat-message-robot'
    }>
      {sender === "robot" && <img src="robot.png" className="image-profile" />}
      <div className="message-text">
        {message}
      </div>
      {sender === "user" && <img src="./user.png" className="image-profile" />}
    </div>
  );
}


function ChatMessages({ chatMessages }) {
  return (
    <div className="chat-messages-container">
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            key = {chatMessage.id}
          />
        );
      })}
    </div>
  );
}


function App() {

  const [chatMessages, setChatMessages] = React.useState([{
    message: 'Hello chatbot',
    sender: 'user',
    id: 'id1'
  }, {
    message: 'Hi, How can i help you?',
    sender: 'robot',
    id: 'id2'
  }, {
    message: 'Flip the coin',
    sender: 'user',
    id: 'id3'
  }, {
    message: 'Fliped and it is head',
    sender: 'robot',
    id: 'id4'
  }]);

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


root.render(<App />);