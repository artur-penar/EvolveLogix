import React from "react";
import NewLogForm from "./NewLogForm";
import "./DashboardFooter.css";

const Footer = ({
  isNewLogFormVisible,
  setIsNewLogFormVisible,
  newLogName,
  setNewLogName,
  handleSubmit,
}) => (
  <div className="create-log">
    <button
      className="dashboard-button"
      onClick={() => setIsNewLogFormVisible(!isNewLogFormVisible)}
    >
      {isNewLogFormVisible ? "Create New Log ʌ" : "Create New Log v"}
    </button>

    {isNewLogFormVisible && (
      <NewLogForm
        newLogName={newLogName}
        setNewLogName={setNewLogName}
        handleSubmit={handleSubmit}
      />
    )}
  </div>
);

export default Footer;
