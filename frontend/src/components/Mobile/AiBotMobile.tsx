import React from 'react';

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

const AiBotChatMobile: React.FC<AiBotChatMobileProps> = ({ messages, inputValue, setInputValue, sendMessage, handleKeyDown }) => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="headerTitle">AI Chat</h1>
      </header>
      <div className="chatContainer">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.user === 'You' ? 'userMessage' : 'aiMessage'}`}
          >
            <div className="messageContent">
              <div className="messageText">
                <p>
                  <strong>{message.user}:</strong> {message.content}
                </p>
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
          Send
        </button>
      </footer>
    </div>
  );
};

export default AiBotChatMobile;
