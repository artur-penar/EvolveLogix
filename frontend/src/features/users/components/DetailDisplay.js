import React from "react";

const DetailDisplay = ({ formData, handleEdit }) => (
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
        <label>{key}:</label>
        <input
          className="centered-input"
          type="number"
          name={key}
          value={value}
          disabled
          min="0"
        />
      </div>
    ))}
    <button className="user-details-button" onClick={handleEdit}>
      Edit
    </button>
  </div>
);

export default DetailDisplay;
