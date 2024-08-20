import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import SetupProfileMobile from '../components/Mobile/SetupProfileMobile';
import SetupProfileDesktop from '../components/Desktop/SetupProfileDesktop';

const SetupProfile: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const slides = [
    { title: 'Slide 1', content: 'Content for the first slide' },
    { title: 'Slide 2', content: 'Content for the second slide' },
    { title: 'Setup Profile', content: '' }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!nickname || !imageUrl || !email) {
      setError('Nickname, image URL, and email are required.');
      return;
    }

    try {
      await axios.post('https://chattappbuzz.onrender.com/api/data', {
        nickname,
        image: imageUrl,
        email, // Including email in the request
      });
      setError('');
      navigate('/main', { state: { email } });
    } catch (error) {
      console.error('Error saving nickname, image, or email:', error);
      setError('An error occurred while saving the data.');
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

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <SetupProfileDesktop />
  );
};

export default SetupProfile;
