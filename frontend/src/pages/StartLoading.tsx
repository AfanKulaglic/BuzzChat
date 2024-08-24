import React from "react";

const StartLoading: React.FC = () => {
  return (
    <div className="start-loading-container">
      <img src="/logo ss.png" alt="Loading Spinner" className="loading-logo" />
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default StartLoading;
