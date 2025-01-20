import React from "react";
import "./SimpleHeader.css";

const SimpleHeader = ({ headerContent }) => {
  return (
    <div className="simple-header-container bg-simple-header">
      <h5>{headerContent}</h5>
    </div>
  );
};

export default SimpleHeader;
