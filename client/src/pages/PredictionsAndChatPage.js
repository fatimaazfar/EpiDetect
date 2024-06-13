import React from 'react';
import Predict from '../components/Predictions/Predict';
import ChatBot from '../components/ChatBot/ChatBot';
import './PredictionsAndChatPage.css'; // Import CSS file for styling

const PredictionsAndChatPage = () => {
  return (
    <div>
      {/* <h1>Predictions and Chat</h1> */}
      <div className="predictions-chat-container">
        <div className="predictions-container">
          {/* <h2>Predict Skin Disease</h2> */}
          <Predict />
        </div>
        <div className="chatbot-container">
          {/* <h2>Chat with Chatbot</h2> */}
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default PredictionsAndChatPage;
