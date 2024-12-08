import React from "react";
import "./PanelHeader.css";

const PanelHeader = ({ title }) => {
  return (
    <div className="panel-header">
      <h3>{title}</h3>
    </div>
  );
};

export default PanelHeader;
