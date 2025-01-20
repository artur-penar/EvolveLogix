import React from "react";
import UserMeasurementForm from "./UserMeasurementForm";
import UserDetailsNavigation from "./UserDetailsNavigation";
import PanelHeader from "../PanelHeader/PanelHeader";
import useUserDetails from "./useUserDetails";
import "./UserDetailsPanel.css";

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

  const {
    formData,
    updatedAtData,
    currentIndex,
    handleSubmit,
    handleInputChange,
    handlePrev,
    handleNext,
  } = useUserDetails(userDetails, initialUserDetails);

  return (
    <div className="user-details-container">
      <PanelHeader title="User Details" />
      <div className="user-details-panel">
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
    </div>
  );
};

export default UserDetailsPanel;
