import React from "react";
import "./UserDetails.css";

const UserDetails = ({ userDetail }) => {
  const { updated_at, ...bodyMeasurements } = userDetail;
  const updatedAtData = new Date(updated_at);

  return (
    <div className="user-details-container">
      <h3>User details:</h3>
      <div className="body-measurements">
        <p>{`Updated at: ${updatedAtData.toLocaleDateString()}`}</p>
        {Object.entries(bodyMeasurements).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
