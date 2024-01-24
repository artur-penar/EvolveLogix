import React, { useState } from "react";
import DetailDisplay from "./DetailDisplay";
import "./UserDetails.css";
import DetailEditForm from "./DetailEditForm";
import { createUserDetail, updateUserDetail } from "../user";
import { useDispatch } from "react-redux";

const UserDetails = ({ userDetail }) => {
  const { updated_at, ...bodyMeasurements } = userDetail[userDetail.length - 1];
  const updatedAtData = new Date(updated_at);

  // React hooks
  const dispatch = useDispatch();

  // State data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(bodyMeasurements);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    console.log("UserDetails: handleSubmit()");
    console.log(formData);
    setIsEditing(false);
    dispatch(createUserDetail(formData));
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
