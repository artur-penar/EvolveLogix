import React from "react";
import "./PhaseForm.css";

const PhaseForm = ({ weeks, trainingDays }) => {
  // const weeks = 4;
  const fields = ["Squat", "Bench", "Deadlift", "Overhead press"];
  const exercises = 3;
  // const trainingDays = 3;

  return (
    <div className="phase-form-container">
      <h4 className="header-container">Phase programming</h4>
      {Array.from(
        { length: parseInt(trainingDays, 10) + 1 },
        (_, i) => i + 1
      ).map((day) => (
        <div key={day}>
          <div className="phase-week-container">
            <div className="week">
              <label>Day {day}:</label>
            </div>
            {Array.from(
              { length: parseInt(weeks, 10) + 1 },
              (_, i) => i + 1
            ).map((week) => (
              <div key={week} className="week">
                <label>Week {week}</label>
              </div>
            ))}
          </div>
          {Array.from({ length: exercises }, (_, i) => i + 1).map(
            (exercise) => (
              <div key={exercise} className="phase-week-container">
                <div className="week">
                  <select className="exercise-select">
                    {fields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
                {Array.from(
                  { length: parseInt(weeks, 10) + 1 },
                  (_, i) => i + 1
                ).map((week) => (
                  <div key={week} className="week">
                    <select className="phase-input">
                      {Array.from({ length: 100 }, (_, i) => i + 1).map(
                        (weight) => (
                          <option key={weight} value={weight}>
                            {weight}%
                          </option>
                        )
                      )}
                    </select>
                    <label>x</label>
                    <input
                      className="phase-input"
                      type="text"
                      placeholder="reps"
                    />
                    <label>x</label>
                    <input
                      className="phase-input"
                      type="text"
                      placeholder="sets"
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default PhaseForm;
