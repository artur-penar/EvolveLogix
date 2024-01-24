import React from "react";
import "./UserDetails.css";

const UserDetails = ({ userDetail }) => (
  <div className="user-details-container">
    <div className="body-measurements">
      {Object.entries(userDetail).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
    </div>
  </div>
);

export default UserDetails;
