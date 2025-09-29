import RobotProfile from '../assets/robot.png';
import UserProfile from '../assets/user.png';
import './ChatMessage.css';

function ChatMessage({ message, sender }) {
  return (
    <div className={
      sender === 'user' 
      ? 'chat-message-user' 
      : 'chat-message-robot'
    }>
      {sender === "robot" && <img src={RobotProfile} className="image-profile" />}
      <div className="message-text">
        {message}
      </div>
      {sender === "user" && <img src={UserProfile} className="image-profile" />}
    </div>
  );
}

export default ChatMessage;