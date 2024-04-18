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

  const renderWeightSelect = () => (
    <select className="phase-input">
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
      <div key={exercise} className="phase-week-container">
        {renderSelectExerciseField(exercisesNameList)}
        {Array.from(
          { length: parseInt(weekNumber, 10) + 1 },
          (_, i) => i + 1
        ).map((week) => (
          <div key={week} className="week">
            {renderWeightSelect()}
            <label>x</label>
            <input className="phase-input" type="text" placeholder="reps" />
            <label>x</label>
            <input className="phase-input" type="text" placeholder="sets" />
          </div>
        ))}
      </div>
    ));

  return (
    <div className="phase-form-container">
      <h4 className="header-container">Phase programming</h4>
      {Array.from(
        { length: parseInt(trainingDays, 10) + 1 },
        (_, i) => i + 1
      ).map((trainingDay) => (
        <div key={trainingDay}>
          <div className="phase-week-container">
            <div className="week">
              <label>Day {trainingDay}:</label>
            </div>
            {renderWeekLabels(weekNumber)}
          </div>
          {renderWeekComponents(exercisesNumber, weekNumber, exercisesNameList)}
        </div>
      ))}
    </div>
  );
};

export default PhaseForm;
