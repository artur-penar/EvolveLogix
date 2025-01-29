import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./NewLogForm.css";

/**
 * NewLogForm component renders a form to create a new log.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.formData - The form data object.
 * @param {function} props.formData.handleSubmit - The function to handle form submission.
 * @param {string} props.formData.newLogName - The current value of the new log name input.
 * @param {function} props.formData.setNewLogName - The function to update the new log name input value.
 * @returns {JSX.Element|null} The rendered form element or null if formData is undefined.
 */
const NewLogForm = ({ formData }) => {
  if (!formData) {
    return null; // Handle the case where formData is undefined
  }

  return (
    <div className="new-log-form-container">
      <form className="new-log-form" onSubmit={formData.handleSubmit}>
        <label style={{ fontWeight: "bold" }}>
          Create new log:
          <input
            type="text"
            placeholder="Enter log name"
            value={formData.newLogName}
            onChange={(e) => formData.setNewLogName(e.target.value)}
          />
        </label>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            color: "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
              borderColor: "green",
            },
          }}
        >
          Create log
        </Button>
      </form>
    </div>
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
