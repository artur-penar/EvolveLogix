import React, { useState } from "react";
import DetailDisplay from "./DetailDisplay";
import DetailEditForm from "./DetailEditForm";
import "./StrengthRecords.css";

const StrengthRecords = () => {
  const userDetail = {
    "bench press": 100,
    deadlift: 200,
    squat: 300,
    "overhead press": 400,
    "barbell row": 500,
    updated_at: "2021-01-01",
  };
  const { updated_at, ...bodyMeasurements } = userDetail;
  const updatedAtData = new Date(updated_at);

  // State data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(bodyMeasurements);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(bodyMeasurements);

  return (
    <div className="user-details-container">
      <h3>Strength Records:</h3>
      <p>{`Updated at: ${updatedAtData.toLocaleDateString()}`}</p>
      {isEditing ? (
        <DetailEditForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <DetailDisplay formData={formData} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default StrengthRecords;
