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
          <div>
            <div key={week} className="week">
              <label>Week {week}</label>
            </div>
            <div style={{ display: "flex", alignContent: "row" }}>
              <select className="form-control"></select>
              <p>x</p>
              <input className="form-control" type="number" />
              <p>kg</p>
              <input className="phase-input" type="number" />
              <p>reps</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseForm;
