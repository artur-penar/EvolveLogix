import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./UserMeasurementForm.css";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const UserMeasurementForm = ({ formData, handleInputChange, handleSubmit }) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  return (
    <form className="body-measurements-form" onSubmit={handleSubmit}>
      <fieldset>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="measurement-row">
            <label htmlFor={key}>{capitalizeFirstLetter(key)}:</label>
            <input
              className="centered-input"
              type="number"
              id={key}
              name={key}
              value={value}
              disabled={!isEditable}
              onChange={isEditable ? handleInputChange : null}
              min="0"
            />
          </div>
        ))}
      </fieldset>
      {isEditable ? (
        <button
          type="submit"
          className="user-details-button body-measurements-form-button"
        >
          Save
        </button>
      ) : (
        <Button 
        variant="outlined"
        size="large"
        onClick={handleEdit}>Edit</Button>
      )}
    </form>
  );
};

export default UserMeasurementForm;
