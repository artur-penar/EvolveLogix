import React from "react";
import LogSelector from "./LogSelector/LogSelector";
import NewLogForm from "./NewLogForm/NewLogForm";
import "./TrainingLogPanel.css";

const TrainingLogPanel = ({ logData, formData }) => {
  return (
    <div className="training-log-info-container">
      <h3>Training Log Panel</h3>
      <div className="training-log-info-row">
        <LogSelector
          trainingLogs={logData.trainingLogs}
          selectedLog={logData.localSelectedLog}
          handleChange={logData.handleChange}
        />
        <NewLogForm formData={formData} />
      </div>
    </div>
  );
};

export default TrainingLogPanel;
