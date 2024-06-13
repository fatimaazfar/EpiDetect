import React, { useState, useEffect, useRef } from 'react';
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

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const updatedMessages = [...messages, { text: inputText, sender: 'user' }];
    setMessages(updatedMessages);
    setInputText('');
    setTimeout(() => {
      setMessages([...updatedMessages, { text: 'How can I assist you further?', sender: 'bot' }]);
    }, 500);
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
<div className="chatbot-container">
  <div className="chatbot">
    <div className="chatbot-header"><strong>Chatbot</strong></div> {/* Added chatbot header */}
    <div className="chatbot-messages">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {message.text}
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
