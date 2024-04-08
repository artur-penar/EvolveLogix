import React, { useEffect, useState } from "react";
import DetailDisplay from "./DetailDisplay";
import "./UserDetails.css";
import DetailEditForm from "./DetailEditForm";
import { createUserDetail, updateUserDetail } from "../user";
import { useDispatch } from "react-redux";

const UserDetails = ({ userDetail }) => {
  const [currentIndex, setCurrentIndex] = useState(userDetail.length - 1);

  const { updated_at, ...bodyMeasurements } = userDetail[currentIndex];
  const [formData, setFormData] = useState(bodyMeasurements);
  const updatedAtData = new Date(updated_at);

  // React hooks
  const dispatch = useDispatch();

  // State data
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(bodyMeasurements);
  }, [currentIndex]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    dispatch(createUserDetail(formData));
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Prev and Next buttons
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < userDetail.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="user-details-container">
      <div
        style={{
          display: "flex",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
          marginBottom: "10px",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <h3>User details:</h3>
      </div>
      <div className="user-details-header">
        <p>{`Updated at: ${updatedAtData.toLocaleDateString()}`}</p>
        <div>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === userDetail.length - 1}
          >
            Next
          </button>
        </div>
      </div>
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
