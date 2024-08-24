import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: Date;
}

interface AiBotChatMobileProps {
  messages: Message[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AiBotChatMobile: React.FC<AiBotChatMobileProps> = ({
  messages,
  inputValue,
  setInputValue,
  sendMessage,
  handleKeyDown,
}) => {
  const navigate = useNavigate();

  return (
    <div className="chat-container chat-container-desktop">
      <header className="header">
        <ArrowBackIcon
          className="back-arrow"
          onClick={() => navigate("/main")}
        />
        <img src="/bot.png" alt={`Bot avatar`} className="avatar" />
        <h1 className="headerTitle">AI Chat</h1>
      </header>
      <div className="chatContainer">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.user === "You" ? "userMessage" : "friendMessage"
            }`}
          >
            <div className="messageContent">
              <div className="messageUserInfo">
                <strong>{message.user}:</strong>
              </div>
              <div className="messageText">
                <p>{message.content}</p>
              </div>
              <div className="messageDescription">
                <span>{message.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">
        <input
          type="text"
          placeholder="Enter your message..."
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="sendButton" onClick={sendMessage}>
          <SendIcon />
        </button>
      </footer>
    </div>
  );
};

export default AiBotChatMobile;
