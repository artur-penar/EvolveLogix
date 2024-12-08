import React from "react";
import NewLogForm from "../NewLogForm/NewLogForm";
import "./NoLogsPanel.css";

/**
 * NoLogsPanel component displays a message indicating no logs are found and provides a form to create a new log.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.formData - The data to be used in the new log form.
 * @returns {JSX.Element} The NoLogsPanel component.
 */
const NoLogsPanel = ({ formData }) => {
  return (
    <div>
      <p className="no-logs-panel-info">
        No logs found. Create your first log!
      </p>
      <NewLogForm formData={formData} />
    </div>
  );
};

export default NoLogsPanel;
