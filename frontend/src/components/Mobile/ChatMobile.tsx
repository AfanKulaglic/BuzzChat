import React, { useEffect, useState, useRef, KeyboardEvent } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://backend-fgom.onrender.com");

interface ChatMobileProps {
  friendUsername?: string;
  friendImage?: string;
  userUsername: string;
}

interface Message {
  user: string;
  content: string;
  timestamp: string;
  toUser: string;
  _id: string;
}

interface DataItem {
  _id: string;
  nickname: string;
  image: string; // User's profile image URL
  messages: Message[];
}

export const ChatMobile: React.FC<ChatMobileProps> = ({
  friendUsername,
  friendImage,
  userUsername,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [friendData, setFriendData] = useState<DataItem | null>(null);
  const [userData, setUserData] = useState<DataItem | null>(null);
  const isSending = useRef(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>(
        "https://backend-fgom.onrender.com/api/data"
      );
      const friend = response.data.find(
        (item) => item.nickname === friendUsername
      );
      const user = response.data.find(
        (item) => item.nickname === userUsername
      );

      setFriendData(friend || null);
      setUserData(user || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendMessage = async () => {
    if (isSending.current || !friendData || !userData || !inputValue.trim()) return;
    isSending.current = true;

    try {
      const message: Message = {
        user: userUsername,
        content: inputValue,
        timestamp: new Date().toISOString(),
        toUser: friendUsername || "",
        _id: new Date().toISOString(), // Unique identifier for the message
      };

      // Send message to the backend for both friend and user
      await axios.patch(
        `https://backend-fgom.onrender.com/api/data/${friendData._id}/messages`,
        message
      );
      await axios.patch(
        `https://backend-fgom.onrender.com/api/data/${userData._id}/messages`,
        message
      );

      // Update local state to reflect the change immediately
      setFriendData((prev) => {
        if (prev) {
          const messageExists = prev.messages.some(
            (m) => m._id === message._id
          );
          if (!messageExists) {
            return {
              ...prev,
              messages: [...prev.messages, message],
            };
          }
        }
        return prev;
      });

      setUserData((prev) => {
        if (prev) {
          const messageExists = prev.messages.some(
            (m) => m._id === message._id
          );
          if (!messageExists) {
            return {
              ...prev,
              messages: [...prev.messages, message],
            };
          }
        }
        return prev;
      });

      // Clear the input field after sending the message
      setInputValue("");
    } catch (error) {
      setInputValue("");
    } finally {
      isSending.current = false;
    }
  };

  useEffect(() => {
    fetchData();

    const receiveMessageHandler = (message: Message) => {
      if (friendData && message.toUser === userUsername) {
        setFriendData((prev) => {
          const messageExists = prev?.messages.some(
            (m) => m._id === message._id
          );
          if (!messageExists) {
            return {
              ...prev!,
              messages: [...prev!.messages, message],
            };
          }
          return prev;
        });
      }

      if (userData && message.toUser === friendUsername) {
        setUserData((prev) => {
          const messageExists = prev?.messages.some(
            (m) => m._id === message._id
          );
          if (!messageExists) {
            return {
              ...prev!,
              messages: [...prev!.messages, message],
            };
          }
          return prev;
        });
      }
    };

    socket.on("receiveMessage", receiveMessageHandler);

    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [friendUsername, friendData, userUsername, userData]);

  const filteredMessages = [
    ...(friendData?.messages.filter(
      (message) =>
        (message.user === userUsername && message.toUser === friendUsername) ||
        (message.user === friendUsername && message.toUser === userUsername)
    ) || []),
    ...(userData?.messages.filter(
      (message) =>
        (message.user === userUsername && message.toUser === friendUsername) ||
        (message.user === friendUsername && message.toUser === userUsername)
    ) || []),
  ];

  // Sort messages by timestamp
  const sortedMessages = filteredMessages.sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Handle Enter key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior
      sendMessage();
    }
  };

  return (
    <div className="container">
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
      <div className="chatContainer">
        {sortedMessages.map((message) => {
          // Determine the sender's image
          const senderData = message.user === userUsername ? userData : friendData;
          const senderImage = senderData?.image || '';

          return (
            <div
              key={message._id} // Ensure the key is unique
              className={`message ${message.user === userUsername ? 'userMessage' : ''}`}
            >
              <div className="messageContent">
                <img
                  src={senderImage}
                  alt={`${message.user}'s avatar`}
                  className="messageAvatar"
                />
                <div className="messageText">
                  <p><strong>{message.user}:</strong> {message.content}</p>
                  <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
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
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
        />
        <button className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </footer>
    </div>
  );
};
