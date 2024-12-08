import React from "react";
import NewLogForm from "./NewLogForm/NewLogForm";

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
      <p className="tcf-info">No logs found. Create your first log!</p>
      <div className="new-log-form-container">
        <NewLogForm formData={formData} />
      </div>
    </div>
  );
};

export default NoLogsPanel;
