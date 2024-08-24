import React from "react";
import { useHomeContentLogic, DataItem } from "../../Hooks/useHomeContentLogic";
import { useNavigate } from "react-router-dom";

interface NaHomeContentDesktopProps {
  userName: string;
  data: DataItem[];
  onTabChange: (newValue: number) => void;
}

export const NaHomeContentDesktop: React.FC<NaHomeContentDesktopProps> = ({
  userName,
  data,
  onTabChange,
}) => {
  const { lastMessages, handleUserClick, getTimeDifference } =
    useHomeContentLogic({
      userName,
      data,
    });

  const navigate = useNavigate();

  const handlePlusButtonClick = () => {
    onTabChange(1);
  };

  return (
    <div className="home-content-mobile-container home-content-desktop-container">
      <div
        className="home-content-mobile-item-section"
        onClick={() => navigate("/aiBot")}
      >
        <img
          src="/bot.png"
          className="home-content-mobile-img"
          alt="Chat Bot AI"
        />
        <div className="home-content-mobile-section">
          <h3 className="home-content-mobile-username">Chat Bot AI</h3>
        </div>
      </div>

      {[...lastMessages.values()].length === 0 ? (
        <div className="home-content-mobile-no-messages home-content-desktop-no-messages">
          <p className="home-content-mobile-no-messages-text">
            You don't have any messages yet. Find friends to chat with!
            <br />
            <button
              className="home-content-mobile-plus-button"
              onClick={handlePlusButtonClick}
            >
              +
            </button>
          </p>
        </div>
      ) : (
        [...lastMessages.values()]
          .sort(
            (a, b) =>
              new Date(b.message.timestamp).getTime() -
              new Date(a.message.timestamp).getTime()
          )
          .map(({ message, item }) => {
            const displayName =
              message.user === userName ? message.toUser : message.user;
            let displayImage = "/defaultProfile.png";

            const matchedUser = data.find((d) => d.nickname === displayName);
            if (matchedUser) {
              displayImage = matchedUser.image;
            }

            let containerClass = "home-content-mobile-item-section";

            if (message.seen === false && message.user === displayName) {
              containerClass += " home-content-mobile-item-section-blue";
            }

            return (
              <div
                key={item._id}
                className={containerClass}
                onClick={() => handleUserClick(message)}
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
                    {message.user === userName ? "You: " : ""}
                    {message.content}
                  </p>
                  {message.user === userName && (
                    <p className="home-content-mobile-seen">
                      {message.seen ? "Seen" : "Not seen yet"}
                    </p>
                  )}
                </div>
                <p className="home-content-mobile-timestamp">
                  {getTimeDifference(new Date(message.timestamp))}
                </p>
              </div>
            );
          })
      )}
    </div>
  );
};
