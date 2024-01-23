import React from "react";

const UserDetails = ({ userDetail }) => (
  <div className="log-details">
    <div className="strength-records">
      {Object.entries(userDetail).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
    </div>
  </div>
);

export default UserDetails;
