import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const socketUrl = "https://chattappbuzz.onrender.com/";
const socket: Socket = io(socketUrl);

interface Message {
  _id: string;
  user: string;
  content: string;
  timestamp: Date;
  toUser: string;
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
        // Provjeri je li poruka od prijatelja s kojim se korisnik razgovarao
        if (message.user === userName || message.toUser === userName) {
          if (
            !userMessages.has(friend) ||
            new Date(userMessages.get(friend)!.message.timestamp) < new Date(message.timestamp)
          ) {
            userMessages.set(friend, { message, item });
          }
        }
      });
    });

    setLastMessages(userMessages);

    const receiveMessageHandler = (message: Message) => {
      const friend = message.user === userName ? message.toUser : message.user;
      // Provjeri je li nova poruka relevantna
      if (message.user === userName || message.toUser === userName) {
        setLastMessages((prevLastMessages) => {
          const updatedMessages = new Map(prevLastMessages);
          const item = data.find(d => d.nickname === friend);
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
    const chatUser = item.nickname === userName ? message.toUser : item.nickname;
    console.log("Navigating to chat with:", chatUser);
    navigate(`/chat/${chatUser}`);
  };

  return (
    <div className="home-content-mobile-container">
      {[...lastMessages.values()].map(({ message, item }) => {
        // Logika za odlučivanje kada prikazati komponentu
        const displayName = item.nickname === userName ? message.toUser : item.nickname;
        return (
          displayName !== userName && (
            <div
              key={item._id}
              className="home-content-mobile-item-section"
              onClick={() => handleUserClick(item, message)}
            >
              <img
                src={item.image}
                className="home-content-mobile-img"
                alt={item.nickname}
              />
              <div className="home-content-mobile-section">
                <h3 className="home-content-mobile-username">
                  {displayName}
                </h3>
                <p className="home-content-mobile-message">
                  {message.user === userName ? "You: " : ""}{message.content}
                </p>
              </div>
              <p className="home-content-mobile-timestamp">
                {getTimeDifference(new Date(message.timestamp))}
              </p>
            </div>
          )
        );
      })}
    </div>
  );
};
