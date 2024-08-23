import React, { KeyboardEvent, useRef, useEffect, useState } from "react";
import { useChatLogic } from "../Hooks/useChatLogic";
import SendIcon from '@mui/icons-material/Send';

interface ChatDesktopProps {
  friendUsername?: string;
  friendImage?: string;
  userUsername: string;
}

export const ChatDesktop: React.FC<ChatDesktopProps> = ({
  friendUsername,
  friendImage,
  userUsername,
}) => {
  const { inputValue, userData, sendMessage, handleInputChange } = useChatLogic(
    friendUsername,
    userUsername
  );
  
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredMessages = [
    ...(userData?.messages.filter(
      (message) =>
        (message.user === userUsername && message.toUser === friendUsername) ||
        (message.user === friendUsername && message.toUser === userUsername)
    ) || []),
  ];

  const sortedMessages = filteredMessages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Scroll to bottom if user is at the bottom
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && isScrolledToBottom) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [sortedMessages, isScrolledToBottom]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // Check if the user is scrolled to the bottom
      const atBottom = chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 1;
      setIsScrolledToBottom(atBottom);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="chat-container chat-container-desktop">
      <header className="header">
        {friendImage ? (
          <img
            src={friendImage}
            alt={`${friendUsername}'s avatar`}
            className="avatar"
          />
        ) : (
          <div className="avatarPlaceholder" />
        )}
        <h1 className="headerTitle">
          {friendUsername || "Nepoznat prijatelj"}
        </h1>
      </header>
      <div className="chatContainer" ref={chatContainerRef}>
        {sortedMessages.map((message) => {
          const senderImage =
            message.user === userUsername ? userData?.image : friendImage || "";

          return (
            <div
              key={message._id}
              className={`message ${
                message.user === userUsername ? "userMessage" : "friendMessage"
              } message-desktop`}
            >
              <div className="messageContent">
                <div className="messageUserInfo">
                  <img
                    src={senderImage || ""}
                    alt={`${message.user}'s avatar`}
                    className="messageAvatar"
                  />
                  <strong className="messageUser">{message.user}</strong>
                </div>
                <p className="messageText">{message.content}</p>

                <div className="messageDescription">
                  {message.user === userUsername && (
                    <div
                      className={`messageStatus ${
                        message.seen ? "seen" : "notSeen"
                      }`}
                    >
                      {message.seen ? "✓ seen" : "⏳ not seen yet"}
                    </div>
                  )}
                  <span className="messageTimestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <footer className="footer">
        <input
          type="text"
          placeholder="Unesite poruku..."
          className="input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="sendButton" onClick={sendMessage}>
          <SendIcon />
        </button>
      </footer>
    </div>
  );
};
