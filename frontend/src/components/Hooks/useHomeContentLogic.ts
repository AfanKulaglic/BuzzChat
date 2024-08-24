import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const socketUrl = "https://buzzchat-beo9.onrender.com/";
const socket: Socket = io(socketUrl);

export interface Message {
  _id: string;
  user: string;
  content: string;
  timestamp: Date;
  toUser: string;
  seen?: boolean;
}

export interface DataItem {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  messages: Message[];
}

interface UseHomeContentLogicProps {
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

export const useHomeContentLogic = ({
  userName,
  data
}: UseHomeContentLogicProps) => {
  const navigate = useNavigate();
  const [lastMessages, setLastMessages] = useState<Map<string, { message: Message, item: DataItem }>>(new Map());  

  useEffect(() => {
    const userMessages = new Map<string, { message: Message, item: DataItem }>();

    data.forEach((item) => {
      item.messages.forEach((message) => {
        const friend = message.user === userName ? message.toUser : message.user;

        if (message.user === userName || message.toUser === userName) {
          const existingMessage = userMessages.get(friend);

          if (!existingMessage || new Date(existingMessage.message.timestamp) < new Date(message.timestamp)) {
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

  const handleUserClick = (message: Message) => {
    const chatUser = message.user === userName ? message.toUser : message.user;
    navigate(`/chat/${chatUser}`);
  };

  return {
    lastMessages,
    handleUserClick,
    getTimeDifference
  };
};
