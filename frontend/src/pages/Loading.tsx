import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <CircularProgress />
    </div>
  );
};

export default Loading;
