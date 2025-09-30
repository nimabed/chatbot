import dayjs from 'dayjs';
import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './MessageBox.css';

export function MessageBox({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          time: dayjs().format('h:mma'),
          id: crypto.randomUUID()
        }
      ];

      setInputText('');
      setChatMessages([
        ...userInput,
        {
          message: <img src={LoadingSpinner} className="loading-spinner" />,
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
          time: dayjs().format('h:mma'),
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
            time: dayjs().format('h:mma'),
            id: crypto.randomUUID()
          }
        ];

        setInputText('');
        setChatMessages([
          ...userInput,
          {
            message: <img src={LoadingSpinner} className="loading-spinner" />,
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
            time: dayjs().format('h:mma'),
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