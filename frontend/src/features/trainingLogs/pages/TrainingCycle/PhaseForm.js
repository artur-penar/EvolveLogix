import React from "react";
import "./PhaseForm.css";

const PhaseForm = ({ weekNumber, trainingDays }) => {
  // const weeks = 4;
  const exercisesNameList = ["Squat", "Bench", "Deadlift", "Overhead press"];
  const exercisesNumber = 3;

  const renderWeekLabels = (weeksNumber) =>
    Array.from(
      {
        length: parseInt(weeksNumber, 10) + 1,
      },
      (_, i) => i + 1
    ).map((week) => (
      <div key={week} className="week-label">
        <label>Week {week}</label>
      </div>
    ));

  const renderSelectExerciseField = (exercisesNameList) => {
    return (
      <div className="exercise-select-container">
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

  const renderWeightSelect = () => (
    <select className="input">
      {Array.from({ length: 100 }, (_, i) => i + 1).map((weightInPercent) => (
        <option key={weightInPercent} value={weightInPercent}>
          {weightInPercent}%
        </option>
      ))}
    </select>
  );

  const renderWeekComponents = (
    exercisesNumber,
    weekNumber,
    exercisesNameList
  ) =>
    Array.from({ length: exercisesNumber }, (_, i) => i + 1).map((exercise) => (
      <div key={exercise} className="week-container">
        {renderSelectExerciseField(exercisesNameList)}
        {Array.from(
          { length: parseInt(weekNumber, 10) + 1 },
          (_, i) => i + 1
        ).map((week) => (
          <div key={week} className="exercise-inputs-container">
            {renderWeightSelect()}
            <label>x</label>
            <input className="input" type="text" placeholder="reps" />
            <label>x</label>
            <input className="input" type="text" placeholder="sets" />
          </div>
        ))}
      </div>
    ));

  return (
    <div className="form-container">
      <h4 className="header-container">Phase programming</h4>
      {Array.from(
        { length: parseInt(trainingDays, 10) + 1 },
        (_, i) => i + 1
      ).map((trainingDay) => (
        <div className="training-day-container" key={trainingDay}>
          <div className="week-container">
            <div className="week-label">
              <label>Day {trainingDay}:</label>
            </div>
            {renderWeekLabels(weekNumber)}
          </div>
          {renderWeekComponents(exercisesNumber, weekNumber, exercisesNameList)}
          <div className="button-container">
            <button>Add exercise</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhaseForm;
