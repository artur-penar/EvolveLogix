import React, { useState } from "react";
import DetailDisplay from "./DetailDisplay";
import "./UserDetails.css";
import DetailEditForm from "./DetailEditForm";

const UserDetails = ({ userDetail }) => {
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

  return (
    <div className="user-details-container">
      <h3>User details:</h3>
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

export default UserDetails;
