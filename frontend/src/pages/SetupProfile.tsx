import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SetupProfileMobile from "../components/Mobile/SetupProfileMobile";
import SetupProfileDesktop from "../components/Desktop/SetupProfileDesktop";

const SetupProfile: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Manage Your Chats and Customize Your Profile",
      content:
        'In the "Home" tab, you can find all your previous messages and a list of users you`ve already chatted with. This allows you to quickly access ongoing and past conversations.The chat is real-time, meaning you can see when a message was sent and if it has been read (seen feature). There are also timestamps for each message.In the "Settings" tab, you can easily change your username, profile picture, and manage all other settings, including the option to log out.',
    },
    {
      title: "How to Use the Chat Application",
      content:
        'In the "Explore" tab, you can discover the most active users who have sent the most messages. These users are highlighted as the most valued members of the community.Browse their profiles and start a conversation if you`re interested in connecting with them or learning more.',
    },
    { title: "Setup Profile", content: "" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!nickname || !imageUrl || !email) {
      setError("Nickname, image URL, and email are required.");
      return;
    }

    try {
      await axios.post("https://buzzchat-beo9.onrender.com/api/data", {
        nickname,
        image: imageUrl,
        email,
      });
      setError("");
      navigate("/main", { state: { email } });
    } catch (error) {
      console.error("Error saving nickname, image, or email:", error);
      setError("An error occurred while saving the data.");
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!imageUrl) {
      const defaultImageUrl = "/defaultProfile.png";
      fetch(defaultImageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const defaultFile = new File([blob], "defaultProfile.png", {
            type: "image/png",
          });
          const defaultEvent = {
            target: {
              files: [defaultFile],
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          handleImageChange(defaultEvent);
        });
    }
  }, [imageUrl]);

  return isMobile ? (
    <SetupProfileMobile
      nickname={nickname}
      imageUrl={imageUrl}
      error={error}
      slides={slides}
      currentSlide={currentSlide}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      setNickname={setNickname}
    />
  ) : (
    <SetupProfileDesktop
      nickname={nickname}
      imageUrl={imageUrl}
      error={error}
      slides={slides}
      currentSlide={currentSlide}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      setNickname={setNickname}
    />
  );
};

export default SetupProfile;
