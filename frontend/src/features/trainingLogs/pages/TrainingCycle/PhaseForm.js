import React from "react";
import "./PhaseForm.css";

const PhaseForm = () => {
  const weeks = 4;
  const fields = ["Squat", "Bench", "Deadlift", "Overhead press"];
  return (
    <div className="phase-form-container">
      <h4 className="header-container">Phase programming</h4>
      <div className="phase-week-container">
        <div className="week">
          <label>Day 1:</label>
        </div>
        {Array.from({ length: weeks }, (_, i) => i + 1).map((week) => (
          <div key={week} className="week">
            <label>Week {week}</label>
          </div>
        ))}
      </div>
      <div className="phase-week-container">
        <div className="week">
          <select className="exercise-select">
            {fields.map((field) => (
              <option value={field}>{field}</option>
            ))}
          </select>
        </div>
        {Array.from({ length: weeks }, (_, i) => i + 1).map((week) => (
          <div key={week} className="week">
            <input className="phase-input" type="text" placeholder="weight" />
            <label>x</label>
            <input className="phase-input" type="text" placeholder="reps" />
            <label>x</label>
            <input className="phase-input" type="text" placeholder="sets" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseForm;
