import React, { useState } from "react";
import "./PhaseForm.css";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

// Use the createSelector function from the @reduxjs/toolkit package to create a selector function that returns the exercises state from the Redux store.
// And avoid using the useSelector hook directly in the component file, which create new selector functions every time the component renders.
const selectExercisesState = (state) => state.exercises.exercises;

const selectExerciseNames = createSelector(
  [selectExercisesState],
  (exercises) => exercises.map((exercise) => exercise.name)
);

const PhaseForm = ({
  weekNumber,
  trainingDays,
  dayExercisesNumber,
  handleAddExercise,
}) => {
  const exercisesNameList = useSelector(selectExerciseNames);
  const [exercisesPerDay, setExercisesPerDay] = useState(
    Array(trainingDays + 1).fill(1)
  );

  console.log(exercisesPerDay);

  const handleAddExercise2 = (dayIndex) => {
    setExercisesPerDay((prevState) => {
      // Ensure dayIndex is within the bounds of the array
      dayIndex = Math.min(dayIndex, prevState.length - 1);
  
      const newState = [...prevState];
      newState[dayIndex] += 1;
      return newState;
    });
  };
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
          {renderWeekComponents(
            exercisesPerDay[trainingDay - 1],
            weekNumber,
            exercisesNameList
          )}
          <div className="button-container">
            <button onClick={() => handleAddExercise2(trainingDay)}>
              Add exercise
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhaseForm;
