import React from "react";
import "./LogSelector.css";

const LogSelector = ({ trainingLogs, selectedLog, handleChange }) => (
  <div className="log-selector">
    <select value={selectedLog} onChange={handleChange}>
      {trainingLogs.map((log) => (
        <option key={log.id} value={log.name}>
          {log.name}
        </option>
      ))}
    </select>
  </div>
);

export default LogSelector;
