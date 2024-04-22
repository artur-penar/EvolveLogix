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

  useEffect(() => {
    Array.from({ length: parseInt(trainingDays, 10) + 1 }, (_, i) => i).map(
      (trainingDayIndex) => {
        if (!weeklyExercisePlan[trainingDayIndex]) {
          setWeeklyExercisePlan((prevState) => {
            const newState = [...prevState];
            newState.push({
              dayNumber: trainingDayIndex + 1,
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
              ],
            });
            return newState;
          });
        }
      }
    );
  }, [trainingDays]);

  // Now work on the days array
  const initialWeeklyExercisePlan = [
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

  const [weeklyExercisePlan, setWeeklyExercisePlan] = useState(
    initialWeeklyExercisePlan
  );

  const handleExerciseChange = (dayIndex, exerciseIndex, newExerciseName) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises[exerciseIndex].name = newExerciseName;

      return newState;
    });
  };

  // Work end here

  const handleAddExercise = (dayIndex) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises.push({
        name: "Squat",
        weeks: [
          {
            weight: 100,
            reps: 10,
            sets: 5,
          },
        ],
      });
      return newState;
    });

    console.log("Add exercise into list");
  };

  const handleWeightChange = (
    dayIndex,
    exerciseIndex,
    weekIndex,
    newWeight
  ) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises[exerciseIndex].weeks[weekIndex].weight =
        newWeight;

      return newState;
    });
  };

  const handleRepsChange = (dayIndex, exerciseIndex, weekIndex, newReps) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises[exerciseIndex].weeks[weekIndex].reps =
        newReps;

      return newState;
    });
  };

  const handleSetsChange = (dayIndex, exerciseIndex, weekIndex, newSets) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises[exerciseIndex].weeks[weekIndex].sets =
        newSets;

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
    if (
      !weeklyExercisePlan[dayIndex] ||
      !weeklyExercisePlan[dayIndex].exercises[exerciseIndex]
    ) {
      return null;
    }

    return (
      <div className="exercise-select-container">
        <select
          className="exercise-select"
          value={weeklyExercisePlan[dayIndex].exercises[exerciseIndex].name}
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

  const renderWeightSelect = (trainingDayIndex, exerciseIndex, weekNumber) => (
    <select
      className="input"
      value={
        weeklyExercisePlan[trainingDayIndex].exercises[exerciseIndex].weeks[
          weekNumber
        ].weight
      }
      onChange={(e) => {
        handleWeightChange(
          trainingDayIndex,
          exerciseIndex,
          weekNumber,
          e.target.value
        );
      }}
    >
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
  ) => {
    if (!weeklyExercisePlan[trainingDayIndex]) {
      return null;
    }

    return Array.from({ length: exercisesNumber }, (_, i) => i).map(
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
              {renderWeightSelect(trainingDayIndex, exerciseIndex, weekNumber)}
              <label>x</label>
              <input
                className="input"
                type="text"
                value={
                  weeklyExercisePlan[trainingDayIndex].exercises[exerciseIndex]
                    .weeks[weekNumber].reps
                }
                onChange={(e) => {
                  handleRepsChange(
                    trainingDayIndex,
                    exerciseIndex,
                    weekNumber,
                    e.target.value
                  );
                }}
                placeholder="reps"
              />
              <label>x</label>
              <input
                className="input"
                type="text"
                value={
                  weeklyExercisePlan[trainingDayIndex].exercises[exerciseIndex]
                    .weeks[weekNumber].sets
                }
                onChange={(e) => {
                  handleSetsChange(
                    trainingDayIndex,
                    exerciseIndex,
                    weekNumber,
                    e.target.value
                  );
                }}
                placeholder="sets"
              />
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <div className="form-container">
      <h4 className="header-container">Phase programming</h4>
      {weeklyExercisePlan.map((weeklyPlan, trainingDayIndex) => (
        <div className="training-day-container" key={trainingDayIndex}>
          <div className="week-container">
            <div className="week-label">
              <label>Day {trainingDayIndex + 1}:</label>
            </div>
            {renderWeekLabels(weekNumber)}
          </div>
          {renderWeekComponents(
            weeklyExercisePlan[trainingDayIndex].exercises.length,
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
      ))}
    </div>
  );
};

export default PhaseForm;
