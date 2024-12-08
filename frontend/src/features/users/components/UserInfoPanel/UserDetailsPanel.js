import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserMeasurementForm from "./UserMeasurementForm";
import { createUserDetail } from "../../user";
import "./UserDetailsPanel.css";
import UserDetailsNavigation from "./UserDetailsNavigation";
import PanelHeader from "./PanelHeader";

const UserDetailsPanel = ({ userDetails }) => {
  // Initial user details
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

  // React hooks
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(userDetails.length - 1);

  // Extracting data
  const { updated_at, ...bodyMeasurements } =
    userDetails[currentIndex] || initialUserDetails[0];
  const [formData, setFormData] = useState(bodyMeasurements);
  const updatedAtData = new Date(updated_at);

  useEffect(() => {
    setFormData(bodyMeasurements);
  }, [currentIndex]);

  const handleSubmit = () => {
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
      <PanelHeader title="User Details" />
      <UserDetailsNavigation
        updatedAtData={updatedAtData}
        handleNext={handleNext}
        handlePrev={handlePrev}
        currentIndex={currentIndex}
        userDetails={userDetails}
      />

      <UserMeasurementForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserDetailsPanel;
