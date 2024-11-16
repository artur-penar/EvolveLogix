import React from "react";
import "./LogSelector.css";

const LogSelector = ({ trainingLogs, selectedLog, handleChange }) => (
  <div className="log-selector">
  <h5>Selected Log:</h5>
    <select value={selectedLog.name} onChange={handleChange}>
      {trainingLogs.map((log) => (
        <option key={log.id} value={log.name}>
          {log.name}
        </option>
      ))}
    </select>
  </div>
);

export default LogSelector;
