const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);

function MessageBox() {
  return (
    <>
      <input placeholder="Send message to chatbot" />
      <button>Send</button>
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


function ChatMessages() {
  const messages = [{
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
  }]

  return messages.map((chatMessage) => {
    return (
      <ChatMessage 
        message = {chatMessage.message}
        sender = {chatMessage.sender}
        key = {chatMessage.id}
      />
    )
  })
}



function App() {
  return (
    <>
      <MessageBox />
      <ChatMessages />
    </>
  );
}




root.render(App());