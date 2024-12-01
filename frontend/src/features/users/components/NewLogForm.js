import React from "react";
import PropTypes from "prop-types";

const NewLogForm = ({ formData }) => {
  if (!formData) {
    return null; // Handle the case where formData is undefined
  }

  return (
    <form onSubmit={formData.handleSubmit}>
      <label>
        Create new log:
        <input
          type="text"
          placeholder="Enter log name"
          value={formData.newLogName}
          onChange={(e) => formData.setNewLogName(e.target.value)}
        />
      </label>
      <button type="submit">Create log</button>
    </form>
  );
};

NewLogForm.propTypes = {
  formData: PropTypes.shape({
    newLogName: PropTypes.string.isRequired,
    setNewLogName: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }),
};

export default NewLogForm;
