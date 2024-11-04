import React from "react";

const LoadingState = () => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
    <h2>Loading...</h2>
  </div>
);

export default LoadingState;
