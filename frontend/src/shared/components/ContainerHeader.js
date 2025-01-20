import React from "react";
import "./ContainerHeader.css";

const ContainerHeader = ({ headerContent }) => {
  return (
    <div className="container-header bg-container-header">
      <h3>{headerContent}</h3>
    </div>
  );
};

export default ContainerHeader;
