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



function App() {
  return (
    <>
      <MessageBox />
      <ChatMessage message="Hello chatbot" sender="user" />
      <ChatMessage message="Hi, How can i help you?" sender="robot" />
    </>
  );
}






root.render(App());