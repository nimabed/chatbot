const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);

function MessageBox({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
    
  }

  function sendMessage() {

    const userInput = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setInputText('');

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...userInput,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
  }

  return (
    <>
      <input 
        placeholder="Send message to chatbot"
        onChange={saveInputText}
        value={inputText}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div>
      {sender === "robot" && <img src="robot.png" width="50" />}
      {message}
      {sender === "user" && <img src="./user.png" width="50" />}
    </div>
  );
}


function ChatMessages({chatMessages}) {
  return (
    <>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            key = {chatMessage.id}
          />
        );
      })}
    </>
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
    <>
      <MessageBox 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages 
        chatMessages={chatMessages}
      />
    </>
  );
}


root.render(<App />);