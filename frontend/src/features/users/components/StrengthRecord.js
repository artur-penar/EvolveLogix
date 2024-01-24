import React from "react";
import "./StrengthRecords.css";

const StrengthRecords = ({ userDetail }) => (
  <div className="strength-records-container">
    <h3>Strength records:</h3>
    <div className="strength-records">
      {Object.entries(userDetail).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
    </div>
  </div>
);

export default StrengthRecords;
