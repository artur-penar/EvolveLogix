import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import "./PhaseForm.css";
import { getExercises } from "features/trainingLogs/exercises";

// Use the createSelector function from the @reduxjs/toolkit package to create a selector function that returns the exercises state from the Redux store.
// And avoid using the useSelector hook directly in the component file, which create new selector functions every time the component renders.
const selectExercisesState = (state) => state.exercises.exercises;

const selectExerciseNames = createSelector(
  [selectExercisesState],
  (exercises) => exercises.map((exercise) => exercise.name)
);

const PhaseForm = ({ weekNumber, trainingDays }) => {
  const totalWeeks = parseInt(weekNumber, 10) + 1;
  const totalTrainingDays = parseInt(trainingDays, 10) + 1;
  const dispatch = useDispatch();

  const [stateChanged, setStateChanged] = useState(0);
  const exercisesNameList = useSelector(selectExerciseNames);
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

  console.log("Select exercise names");
  console.log(exercisesNameList);

  const [weeklyExercisePlan, setWeeklyExercisePlan] = useState(
    initialWeeklyExercisePlan
  );

  useEffect(() => {
    if (!exercisesNameList.length) {
      dispatch(getExercises());
    }
  }, [exercisesNameList]);

  useEffect(() => {
    Array.from({ length: totalTrainingDays }, (_, i) => i).forEach(
      (trainingDayIndex) => {
        setWeeklyExercisePlan((prevState) => {
          if (!prevState[trainingDayIndex]) {
            const initialExercises = initialWeeklyExercisePlan[0].exercises;
            return [
              ...prevState,
              {
                dayNumber: trainingDayIndex + 1,
                exercises: initialExercises,
              },
            ];
          } else if (prevState.length > totalTrainingDays) {
            return prevState.slice(0, totalTrainingDays);
          } else {
            return prevState;
          }
        });
      }
    );
    setStateChanged(stateChanged + 1);
  }, [trainingDays]);

  useEffect(() => {
    Array.from({ length: totalWeeks }, (_, i) => i + 1).forEach(
      (trainingWeekIndex) => {
        setWeeklyExercisePlan((prevState) => {
          const newState = [...prevState];
          newState.forEach((day, dayIndex) => {
            day.exercises.forEach((exercise, exerciseIndex) => {
              if (exercise.weeks.length < trainingWeekIndex) {
                const newWeekLoad = weeklyExercisePlan[0].exercises[0].weeks[0];

                newState[dayIndex].exercises[exerciseIndex].weeks.push(
                  newWeekLoad
                );
              } else if (exercise.weeks.length > totalWeeks) {
                newState[dayIndex].exercises[exerciseIndex].weeks =
                  exercise.weeks.slice(0, totalWeeks);
              }
            });
          });
          console.log("New state", newState);

          return newState;
        });
      }
    );
  }, [weekNumber, stateChanged]);

  const handleExerciseChange = (dayIndex, exerciseIndex, newExerciseName) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      newState[dayIndex].exercises[exerciseIndex].name = newExerciseName;

      return newState;
    });
  };

  const handleAddExercise = (dayIndex) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      const newExercise = weeklyExercisePlan[0].exercises[0];
      newState[dayIndex].exercises.push(newExercise);
      setStateChanged(stateChanged + 1);
      return newState;
    });
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
        length: weeksNumber,
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

  const renderWeightSelect = (trainingDayIndex, exerciseIndex, weekIndex) => (
    <select
      className="input"
      value={
        weeklyExercisePlan[trainingDayIndex] &&
        weeklyExercisePlan[trainingDayIndex].exercises[exerciseIndex] &&
        weeklyExercisePlan[trainingDayIndex].exercises[exerciseIndex].weeks[
          weekIndex
        ]
          ? weeklyExercisePlan[trainingDayIndex].exercises[exerciseIndex].weeks[
              weekIndex
            ].weight
          : 0
      }
      onChange={(e) => {
        handleWeightChange(
          trainingDayIndex,
          exerciseIndex,
          weekIndex,
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
          {Array.from({ length: weekNumber }, (_, i) => i).map((weekIndex) => (
            <div key={weekIndex} className="exercise-inputs-container">
              {renderWeightSelect(trainingDayIndex, exerciseIndex, weekIndex)}
              <label>x</label>
              <input
                className="input"
                type="text"
                value={
                  weeklyExercisePlan[trainingDayIndex]?.exercises[exerciseIndex]
                    ?.weeks[weekIndex]?.reps || 0
                }
                onChange={(e) => {
                  handleRepsChange(
                    trainingDayIndex,
                    exerciseIndex,
                    weekIndex,
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
                  weeklyExercisePlan[trainingDayIndex]?.exercises[exerciseIndex]
                    ?.weeks[weekIndex]?.sets || 0
                }
                onChange={(e) => {
                  handleSetsChange(
                    trainingDayIndex,
                    exerciseIndex,
                    weekIndex,
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
            {renderWeekLabels(totalWeeks)}
          </div>
          {renderWeekComponents(
            weeklyExercisePlan[trainingDayIndex].exercises.length,
            totalWeeks,
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
