import React from "react";

const LoadingState = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <h2>Loading...</h2>
  </div>
);

export default LoadingState;