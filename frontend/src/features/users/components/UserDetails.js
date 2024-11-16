import React, { useEffect, useState } from "react";
import DetailDisplay from "./DetailDisplay";
import "./UserDetails.css";
import DetailEditForm from "./DetailEditForm";
import { createUserDetail, updateUserDetail } from "../user";
import { useDispatch } from "react-redux";

const UserDetails = ({ userDetails }) => {
  const initialUserDetails = [
    {
      updated_at: "2000-01-01T13:39:41.623430Z",
      weight: "0.0",
      height: "0.0",
      chest: "0.0",
      arm: "0.0",
      forearm: "0.0",
      hips: "0.0",
      calves: "0.0",
      thigh: "0.0",
      waist: "0.0",
      neck: "0.0",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(userDetails.length - 1);

  const { updated_at, ...bodyMeasurements } =
    userDetails[currentIndex] || initialUserDetails[0];
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
      prevIndex < userDetails.length - 1 ? prevIndex + 1 : prevIndex
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
            disabled={currentIndex === userDetails.length - 1}
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
