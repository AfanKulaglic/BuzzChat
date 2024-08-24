import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUser } from "../../store/userSlice";

export const useSettingsLogic = (userImage: string, userId: string) => {
  const [image, setImage] = useState(userImage);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const handleImageClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.patch(`https://buzzchat-beo9.onrender.com/api/data/${userId}/updateImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setImage(response.data.image);
      } catch (error) {
        console.error('Error updating image:', error);
      }
    }
  };

  const handleOpenPrivacy = () => setOpenPrivacy(true);
  const handleClosePrivacy = () => setOpenPrivacy(false);

  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return {
    image,
    openPrivacy,
    openTerms,
    darkMode,
    handleLogout,
    handleImageClick,
    handleFileChange,
    handleOpenPrivacy,
    handleClosePrivacy,
    handleOpenTerms,
    handleCloseTerms,
    toggleDarkMode
  };
};
