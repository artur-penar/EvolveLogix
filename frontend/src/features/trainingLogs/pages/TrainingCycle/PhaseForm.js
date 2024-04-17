import React from "react";
import "./PhaseForm.css";

const PhaseForm = () => {
  const weeks = 4;
  const fields = ["Squat", "Bench", "Deadlift", "Overhead press"];
  return (
    <div className="phase-form-container">
      <h4 className="header-container">Phase programming</h4>
      <div className="phase-week-container">
        <label>Day 1:</label>
        {Array.from({ length: weeks }, (_, i) => i + 1).map((week) => (
          <div className="phase-week-container">
            <div key={week} className="week">
              <label>Week {week}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseForm;
