import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    const updatedMessages = [...messages, { text: inputText, sender: 'user' }];
    setMessages(updatedMessages);
    setInputText('');

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', { message: inputText });
      if (response.data && response.data.content) {
        const botMessage = response.data.content;
        setMessages([...updatedMessages, { text: botMessage, sender: 'bot' }]);
      } else {
        setMessages([...updatedMessages, { text: 'Invalid response from backend', sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Error communicating with backend:', error);
      setMessages([...updatedMessages, { text: 'Error communicating with backend', sender: 'bot' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chatbot-header"><strong>Chatbot</strong></div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {/* Use ReactMarkdown to render Markdown content */}
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
