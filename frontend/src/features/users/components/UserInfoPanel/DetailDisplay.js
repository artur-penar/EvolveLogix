import React, { useState } from "react";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DetailDisplay = ({ formData, handleInputChange, handleSubmit }) => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className="body-measurements">
      {Object.entries(formData).map(([key, value]) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <label>{capitalizeFirstLetter(key)}:</label>
          <input
            className="centered-input"
            type="number"
            name={key}
            value={value}
            disabled={!isEditable}
            onChange={isEditable ? handleInputChange : null}
            min="0"
          />
        </div>
      ))}
      {isEditable ? (
        <button className="user-details-button" onClick={handleSubmit}>
          Save
        </button>
      ) : (
        <button
          className="user-details-button"
          onClick={() => setIsEditable(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default DetailDisplay;
