import React from "react";
import "./PhaseForm.css";

const PhaseForm = ({ weekNumber, trainingDays }) => {
  // const weeks = 4;
  const exercisesNameList = ["Squat", "Bench", "Deadlift", "Overhead press"];
  const exercisesNumber = 3;

  const renderWeekLabels = (weeks) =>
    Array.from(
      {
        length: parseInt(weeks, 10) + 1,
      },
      (_, i) => i + 1
    ).map((week) => (
      <div key={week} className="week">
        {" "}
        <label>Week {week}</label>
      </div>
    ));

  const renderSelectExerciseField = (exercisesNameList) => {
    return (
      <div className="week">
        <select className="exercise-select">
          {exercisesNameList.map((exerciseName) => (
            <option key={exerciseName} value={exerciseName}>
              {exerciseName}
            </option>
          ))}
        </select>
      </div>
    );
  };

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
            {renderWeekLabels(weekNumber)}
          </div>
          {Array.from({ length: exercisesNumber }, (_, i) => i + 1).map(
            (exercise) => (
              <div key={exercise} className="phase-week-container">
                {renderSelectExerciseField(exercisesNameList)}
                {Array.from(
                  { length: parseInt(weekNumber, 10) + 1 },
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
