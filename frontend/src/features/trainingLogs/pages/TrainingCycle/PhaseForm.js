import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import "./PhaseForm.css";

// Use the createSelector function from the @reduxjs/toolkit package to create a selector function that returns the exercises state from the Redux store.
// And avoid using the useSelector hook directly in the component file, which create new selector functions every time the component renders.
const selectExercisesState = (state) => state.exercises.exercises;

const selectExerciseNames = createSelector(
  [selectExercisesState],
  (exercises) => exercises.map((exercise) => exercise.name)
);

const PhaseForm = ({ weekNumber, trainingDays }) => {
  const exercisesNameList = useSelector(selectExerciseNames);
  const [exercisesPerDay, setExercisesPerDay] = useState(
    Array(trainingDays + 1).fill(1)
  );

  // Now work on the days array
  const initialDayData = [
    {
      dayNumber: 1,
      exercises: [
        {
          name: "Squat",
          weeks: [
            {
              weight: 100,
              reps: 10,
              sets: 5,
            },
          ],
        },
        // Add more exercises here...
      ],
    },
    // Add more days here...
  ];

  const [days, setDays] = useState(initialDayData);
  console.log(days[0].exercises[0].name);

  const handleExerciseChange = (dayIndex, exerciseIndex, newExerciseName) => {
    setDays((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises[exerciseIndex].name = newExerciseName;
      console.log("New state");
      console.log(newState);
      return newState;
    });
  };


  // Work end here

  useEffect(() => {
    setExercisesPerDay((prevState) => {
      // Create a new array with a length of trainingDays + 1
      // Fill it with 1s, but overwrite those 1s with the existing values from prevState where they exist
      const numberTrainingDays = Number(trainingDays) + 1;
      return Array.from(
        { length: numberTrainingDays },
        (v, i) => prevState[i] || 1
      );
    });
  }, [trainingDays]);

  const handleAddExercise = (dayIndex) => {
    setExercisesPerDay((prevState) => {
      // Ensure dayIndex is within the bounds of the array
      dayIndex = dayIndex - 1;
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

  const renderSelectExerciseField = (
    exercisesNameList,
    exerciseIndex,
    dayIndex
  ) => {
    console.log("dayIndex", dayIndex);
    console.log("exerciseIndex", exerciseIndex);

    if (!days[dayIndex] || !days[dayIndex].exercises[exerciseIndex]) {
      return null;
    }
    return (
      <div className="exercise-select-container">
        <select
          className="exercise-select"
          value={days[dayIndex].exercises[exerciseIndex].name}
          onChange={(e) =>
            handleExerciseChange(dayIndex, exerciseIndex, e.target.value)
          }
        >
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
    exercisesNameList,
    trainingDayIndex
  ) =>
    Array.from({ length: exercisesNumber }, (_, i) => i).map(
      (exerciseIndex) => (
        <div key={exerciseIndex} className="week-container">
          {renderSelectExerciseField(
            exercisesNameList,
            exerciseIndex,
            trainingDayIndex
          )}
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
      )
    );

  return (
    <div className="form-container">
      <h4 className="header-container">Phase programming</h4>
      {Array.from({ length: parseInt(trainingDays, 10) + 1 }, (_, i) => i).map(
        (trainingDayIndex) => (
          <div className="training-day-container" key={trainingDayIndex}>
            <div className="week-container">
              <div className="week-label">
                <label>Day {trainingDayIndex + 1}:</label>
              </div>
              {renderWeekLabels(weekNumber)}
            </div>
            {renderWeekComponents(
              exercisesPerDay[trainingDayIndex],
              weekNumber,
              exercisesNameList,
              trainingDayIndex
            )}
            <div className="button-container">
              <button onClick={() => handleAddExercise(trainingDayIndex)}>
                Add exercise
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PhaseForm;
