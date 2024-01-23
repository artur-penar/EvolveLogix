import React from "react";

const LogDetails = ({ userDetail }) => (
  console.log(userDetail),
  console.log(userDetail),
  (
    <div className="log-details">
      {/* Replace this with the actual log details */}
      <div className="strength-records">
        <h3>Strength personal records </h3>
        <p>Squt: 100kg</p>
        <p>Bench Press: 100kg</p>
        <p>Deadlift: 100kg</p>
      </div>
      {Object.entries(userDetail).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
      <p>Performed trainign sessions = 100</p>
      <p>Log details go here...</p>
    </div>
  )
);

export default LogDetails;
