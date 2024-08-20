import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DataItem {
  _id: string;
  email: string;
  nickname: string;
  image: string;
}

interface ExploreContentMobileProps {
  userName: string;
  userImage: string; // Path to user's image
  data: DataItem[]; // Array of data items
}

export const ExploreContentMobile: React.FC<ExploreContentMobileProps> = ({
  userName,
  userImage,
  data,
}) => {

  const navigate = useNavigate();

  // Filter out the current user's nickname from the data
  const filteredData = data.filter((item) => item.nickname !== userName);

  const handleItemClick = (nickname: string) => {
    navigate(`/chat/${nickname}`);
  };

  return (
    <div className="explore-content-mobile-container">
      <Grid container spacing={2}>
        {/* First Row: User Info */}
        <Grid item xs={6}>
          <div className="explore-content-mobile-user-section" >
            <img 
              src={userImage}
              alt={userName}
              className="explore-content-mobile-image"
            />
            <h3 className="explore-content-mobile-username">{userName}</h3>
          </div>
        </Grid>

        {/* Data Items Rows */}
        {filteredData.map((item) => (
          <Grid item xs={6} key={item._id}>
            <div
              className="explore-content-mobile-item"
              onClick={() => handleItemClick(item.nickname)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={`${item.nickname} icon`}
                className="explore-content-mobile-image"
              />
              <h3 className="explore-content-mobile-username">{item.nickname}</h3>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
