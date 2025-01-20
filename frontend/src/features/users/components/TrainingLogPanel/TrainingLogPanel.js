import React from "react";
import LogSelector from "../LogSelector/LogSelector";
import NewLogForm from "../NewLogForm/NewLogForm";
import "./TrainingLogPanel.css";
import ContainerHeader from "shared/components/ContainerHeader";

/**
 * TrainingLogPanel component renders a panel with training log information and a form for creating new logs.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.logData - The data related to training logs.
 * @param {Array} props.logData.trainingLogs - Array of training log objects.
 * @param {Object} props.logData.localSelectedLog - The currently selected training log.
 * @param {Function} props.logData.handleChange - Function to handle changes in the selected log.
 * @param {Object} props.formData - The data for the new log form.
 *
 * @returns {JSX.Element} The TrainingLogPanel component.
 */
const TrainingLogPanel = ({ logData, formData }) => {
  return (
    <div className="training-log-info-container bg-containers">
      <ContainerHeader headerContent={"Training Log Panel"} />
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
