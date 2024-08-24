import { useState, useEffect } from "react";
import axios from "axios";

export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: Date;
}

export const useAiBotLogic = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkScreenSize = () => {
    const isMobileView = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileView);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      user: "You",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const waitingMessage: Message = {
      id: Date.now() + 1,
      user: "AI",
      content: "Wait...",
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, waitingMessage]);

    const options = {
      method: "GET",
      url: "https://ai-chatbot.p.rapidapi.com/chat/free",
      params: { message: inputValue, uid: "user1" },
      headers: {
        "x-rapidapi-key": "65f8e28fc9msh740f5c710731f09p18f138jsn6eeb3143879e",
        "x-rapidapi-host": "ai-chatbot.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const apiResponse = response.data.chatbot.response;

      const aiReply: Message = {
        id: Date.now() + 2,
        user: "AI",
        content: apiResponse,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages.pop();
        return [...updatedMessages, aiReply];
      });

      setInputValue("");
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        user: "AI",
        content: "The server is temporarily unavailable. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages.pop();
        return [...updatedMessages, errorMessage];
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return { inputValue, setInputValue, messages, sendMessage, handleKeyDown, isMobile };
};
