import React from "react";
import LogSelector from "./LogSelector";
import NewLogForm from "./NewLogForm";
import "./TrainingLogPanel.css";

const TrainingLogPanel = ({ logData, formData }) => {
  return (
    <div className="training-log-info-container">
      <h3>Training Log panel</h3>
      <div className="training-log-info-row">
        <LogSelector
          trainingLogs={logData.trainingLogs}
          selectedLog={logData.localSelectedLog}
          handleChange={logData.handleChange}
        />
        <NewLogForm
          newLogName={formData.newLogName}
          setNewLogName={formData.setNewLogName}
          handleSubmit={formData.handleSubmit}
        />
      </div>
    </div>
  );
};

export default TrainingLogPanel;