import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://buzzchat-beo9.onrender.com/");

interface Message {
  user: string;
  content: string;
  timestamp: string;
  toUser: string;
  _id: string;
  seen?: boolean;
}

interface DataItem {
  _id: string;
  nickname: string;
  image: string;
  messages: Message[];
}

export const useChatLogic = (friendUsername?: string, userUsername?: string) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [friendData, setFriendData] = useState<DataItem | null>(null);
  const [userData, setUserData] = useState<DataItem | null>(null);
  const isSending = useRef(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>(
        "https://buzzchat-beo9.onrender.com/api/data"
      );
      const friend = response.data.find(
        (item) => item.nickname === friendUsername
      );
      const user = response.data.find(
        (item) => item.nickname === userUsername
      );

      setFriendData(friend || null);
      setUserData(user || null);

      if (user && friend) {
        await axios.patch(
          `https://buzzchat-beo9.onrender.com/api/data/${friend._id}/markAsSeen`,
          { user: userUsername }
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendMessage = async () => {
    if (isSending.current || !friendData || !userData || !inputValue.trim()) return;
    isSending.current = true;

    try {
      const messageForFriend: Message = {
        user: userUsername || "",
        content: inputValue,
        timestamp: new Date().toISOString(),
        toUser: friendUsername || "",
        _id: new Date().toISOString(),
        seen: false,
      };

      const messageForUser: Message = {
        user: userUsername || "",
        content: inputValue,
        timestamp: new Date().toISOString(),
        toUser: userUsername || "",
        _id: new Date().toISOString(),
        seen: false,
      };

      await axios.patch(
        `https://buzzchat-beo9.onrender.com/api/data/${friendData._id}/messages`,
        messageForFriend
      );
      await axios.patch(
        `https://buzzchat-beo9.onrender.com/api/data/${userData._id}/messages`,
        messageForUser
      );

      setFriendData((prev) => prev && {
        ...prev,
        messages: [...prev.messages, messageForFriend],
      });

      setUserData((prev) => prev && {
        ...prev,
        messages: [...prev.messages, messageForUser],
      });

      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
      setInputValue("");
    } finally {
      isSending.current = false;
    }
  };

  useEffect(() => {
    fetchData();

    const receiveMessageHandler = (message: Message) => {
      if (friendData && message.toUser === userUsername) {
        setFriendData((prev) => prev && {
          ...prev,
          messages: [...prev.messages, message],
        });
      }

      if (userData && message.toUser === friendUsername) {
        setUserData((prev) => prev && {
          ...prev,
          messages: [...prev.messages, message],
        });
      }
    };

    socket.on("receiveMessage", receiveMessageHandler);

    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendUsername, friendData, userUsername, userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    userData,
    sendMessage,
    handleInputChange,
  };
};
