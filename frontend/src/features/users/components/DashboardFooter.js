import React from "react";
import NewLogForm from "./NewLogForm";

const Footer = ({
  isNewLogFormVisable,
  setIsNewLogFormVisable,
  newLogName,
  setNewLogName,
  handleSubmit,
}) => (
  <div className="create-log">
    <button
      className="dashboard-button"
      onClick={() => setIsNewLogFormVisable(!isNewLogFormVisable)}
    >
      {isNewLogFormVisable ? "Create New Log ʌ" : "Create New Log v"}
    </button>

    {isNewLogFormVisable && (
      <NewLogForm
        newLogName={newLogName}
        setNewLogName={setNewLogName}
        handleSubmit={handleSubmit}
      />
    )}
  </div>
);

export default Footer;
