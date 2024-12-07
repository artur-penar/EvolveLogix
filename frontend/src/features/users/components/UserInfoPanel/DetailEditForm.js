import React from "react";

const DetailEditForm = ({ formData, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="body-measurements">
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
          onChange={handleInputChange}
          min="0"
        />
      </div>
    ))}
    <button type="submit" className="button">
      Submit
    </button>
  </form>
);

export default DetailEditForm;
