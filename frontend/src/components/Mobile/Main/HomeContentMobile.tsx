import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const socketUrl = "https://testchat-repe.onrender.com/";
const socket: Socket = io(socketUrl);

interface Message {
  _id: string;
  user: string;
  content: string;
  timestamp: Date;
  toUser: string;
  seen?: boolean;
}

interface DataItem {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  messages: Message[];
}

interface HomeContentMobileProps {
  userName: string;
  data: DataItem[];
}

const getTimeDifference = (timestamp: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000);

  if (diff < 60) {
    return `${diff} seconds ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minutes ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} days ago`;
  }
};

export const HomeContentMobile: React.FC<HomeContentMobileProps> = ({
  userName,
  data,
}) => {
  const navigate = useNavigate();
  const [lastMessages, setLastMessages] = useState<Map<string, { message: Message, item: DataItem }>>(new Map());

  useEffect(() => {
    const userMessages = new Map<string, { message: Message, item: DataItem }>();

    data.forEach((item) => {
      item.messages.forEach((message) => {
        const friend = message.user === userName ? message.toUser : message.user;

        if (message.user === userName || message.toUser === userName) {
          const existingMessage = userMessages.get(friend);

          if (
            !existingMessage ||
            new Date(existingMessage.message.timestamp) < new Date(message.timestamp)
          ) {
            userMessages.set(friend, { message, item });
          }
        }
      });
    });

    setLastMessages(userMessages);

    const receiveMessageHandler = (message: Message) => {
      const friend = message.user === userName ? message.toUser : message.user;
      if (message.user === userName || message.toUser === userName) {
        setLastMessages((prevLastMessages) => {
          const updatedMessages = new Map(prevLastMessages);
          const item = data.find((d) => d.nickname === friend);
          if (item) {
            updatedMessages.set(friend, { message, item });
          }
          return updatedMessages;
        });
      }
    };

    socket.on("newMessage", receiveMessageHandler);

    return () => {
      socket.off("newMessage", receiveMessageHandler);
    };
  }, [data, userName]);

  const handleUserClick = (item: DataItem, message: Message) => {
    const chatUser = message.user === userName ? message.toUser : message.user;
    console.log("Navigating to chat with:", chatUser);
    navigate(`/chat/${chatUser}`);
  };

  return (
    <div className="home-content-mobile-container">
      {[...lastMessages.values()]
        .sort((a, b) => new Date(b.message.timestamp).getTime() - new Date(a.message.timestamp).getTime())
        .map(({ message, item }) => {
          let displayName;
          let displayImage;
          let containerClass = "home-content-mobile-item-section"; // Default class
  
          // Set displayName based on the message context
          if (message.user === userName) {
            displayName = message.toUser;  // Display the 'toUser' if current user is the sender
          } else {
            displayName = message.user;  // Otherwise, display the sender's name
          }
  
          // Set displayImage: Choose image based on whether it's the sender or receiver
          if (message.user === userName) {
            displayImage = "path_to_default_image";  // Set a default image or user-specific image
          } else {
            displayImage = item.image;  // Use the receiver's image
          }
  
          // Apply blue background if the message is not seen and the user matches the friend
          if (message.seen === false && message.user === displayName) {
            containerClass += " home-content-mobile-item-section-blue";  // Append class for blue background
          }
  
          return (
            <div
              key={item._id}
              className={containerClass}
              onClick={() => handleUserClick(item, message)}
            >
              <img
                src={displayImage}
                className="home-content-mobile-img"
                alt={displayName}
              />
              <div className="home-content-mobile-section">
                <h3 className="home-content-mobile-username">
                  {displayName}
                </h3>
                <p className="home-content-mobile-message">
                  {message.user === userName ? "You: " : ""}{message.content}
                </p>
                {message.user === userName && (
                  <p className="home-content-mobile-seen">
                    {message.seen ? "Seen" : "False"}
                  </p>
                )}
              </div>
              <p className="home-content-mobile-timestamp">
                {getTimeDifference(new Date(message.timestamp))}
              </p>
            </div>
          );
        })}
    </div>
  );
  
  
};
