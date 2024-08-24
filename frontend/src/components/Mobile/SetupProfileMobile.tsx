import React from "react";

interface SetupProfileMobileProps {
  nickname: string;
  imageUrl: string | null;
  error: string;
  slides: { title: string; content: string }[];
  currentSlide: number;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  setNickname: (nickname: string) => void;
}

const SetupProfileMobile: React.FC<SetupProfileMobileProps> = ({
  nickname,
  imageUrl,
  error,
  slides,
  currentSlide,
  handleImageChange,
  handleSubmit,
  nextSlide,
  prevSlide,
  setNickname,
}) => {
  return (
    <div className="slider-container">
      <div className="slides-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${currentSlide === index ? "active" : ""}`}
          >
            <div className="card">
              <h2>{slide.title}</h2>
              <p>{slide.content}</p>
              {index === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imageUrl && (
                    <div>
                      <p>Image Preview:</p>
                      <img src={imageUrl} alt="Preview" />
                    </div>
                  )}
                  {error && <p className="error-message">{error}</p>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="nav-btn">
        {currentSlide > 0 && <button onClick={prevSlide}>Previous</button>}
        {currentSlide < slides.length - 1 && (
          <button onClick={nextSlide}>Next</button>
        )}
        {currentSlide === slides.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default SetupProfileMobile;
