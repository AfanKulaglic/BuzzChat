import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DataItem {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  messages: Message[];
}

interface Message {
  _id: string;
  user: string;
  content: string;
  timestamp: Date;
  toUser: string;
}

interface ExploreContentDesktopProps {
  userName: string;
  userImage: string;
  data: DataItem[];
}

export const ExploreContentDesktop: React.FC<ExploreContentDesktopProps> = ({
  userName,
  userImage,
  data,
}) => {
  const navigate = useNavigate();

  const filteredData = data.filter((item) => item.nickname !== userName);

  const handleItemClick = (nickname: string) => {
    navigate(`/chat/${nickname}`);
  };

  const userMessageData = data.filter((item) => item.nickname === userName);

  return (
    <div className="explore-content-mobile-container explore-content-desktop-container">
      <Grid container spacing={2}>
        {/* First Row: User Info */}
        <Grid item xs={12}>
          <div className="explore-content-mobile-user-section">
            <img
              src={userImage}
              alt={userName}
              className="explore-content-mobile-image"
            />
            <div>
              <h3
                className="explore-content-mobile-username"
                style={{ textShadow: "none" }}
              >
                {userName}
              </h3>
              <p
                className="explore-content-mobile-message-count"
                style={{ textShadow: "none" }}
              >
                {userMessageData.map((item) => item.messages.length)}🫂
              </p>
            </div>
          </div>
        </Grid>

        {/* Data Items Rows */}
        {filteredData.map((item) => (
          <Grid item xs={12} key={item._id}>
            <div
              className="explore-content-mobile-item"
              onClick={() => handleItemClick(item.nickname)}
              style={{
                backgroundImage: `url(${item.image})`,
                cursor: "pointer",
              }}
            >
              <img
                src={item.image}
                alt={`${item.nickname} icon`}
                className="explore-content-mobile-image"
              />
              <div>
                <h3 className="explore-content-mobile-username">
                  {item.nickname}
                </h3>
                <p className="explore-content-mobile-message-count">
                  {item.messages.length / 2}🫂
                </p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
