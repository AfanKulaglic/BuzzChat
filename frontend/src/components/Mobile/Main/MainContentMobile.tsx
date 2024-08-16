import React from "react";
import { Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/userSlice";

interface DataItem {
  _id: string;
  email: string;
  nickname: string;
  image: string;
}

interface MainContentMobileProps {
  userName: string;
  userImage: string; // Path to user's image
  data: DataItem[]; // Array of data items
}

export const MainContentMobile: React.FC<MainContentMobileProps> = ({
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

  const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/')
    };

  return (
    <div className="main-content-mobile-container">
      <Grid container spacing={2}>
        {/* First Row: User Info */}
        <Grid item xs={6}>
          <Paper className="main-content-mobile-user-section">
            <img
              src={userImage}
              alt={userName}
              className="main-content-mobile-image"
            />
            <p className="main-content-mobile-username">{userName}</p>
          </Paper>
        </Grid>

        {/* Data Items Rows */}
        {filteredData.map((item) => (
          <Grid item xs={6} key={item._id}>
            <Paper
              className="main-content-mobile-item"
              onClick={() => handleItemClick(item.nickname)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={`${item.nickname} icon`}
                className="main-content-mobile-image"
              />
              <p className="main-content-mobile-username">{item.nickname}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
