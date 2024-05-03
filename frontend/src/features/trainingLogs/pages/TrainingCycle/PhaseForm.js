import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { getExercises } from "features/trainingLogs/exercises";
import WeekLabels from "./components/WeekLabels";
import WeeklyExercises from "./components/WeeklyExercises";
import "./PhaseForm.css";
import PhaseOption from "./components/PhaseOption";
import RecordDisplay from "features/users/components/StrengthRecords/RecordDisplay";

// Use the createSelector function from the @reduxjs/toolkit package to create a selector function that returns the exercises state from the Redux store.
// And avoid using the useSelector hook directly in the component file, which create new selector functions every time the component renders.
const selectExercisesState = (state) => state.exercises.exercises;

const selectExerciseNames = createSelector(
  [selectExercisesState],
  (exercises) => exercises.map((exercise) => exercise.name)
);

const PhaseForm = ({ weekNumber, trainingDays }) => {
  const powerlifts_exercises = ["Squat", "Bench press", "Deadlift"];
  const totalWeeks = parseInt(weekNumber, 10) + 1;
  const totalTrainingDays = parseInt(trainingDays, 10) + 1;
  const initialWeeklyExercisePlan = [
    {
      dayNumber: 1,
      exercises: [
        {
          name: "Squat",
          weeks: [
            {
              weight: 0,
              reps: 0,
              sets: 0,
            },
          ],
        },
        // Add more exercises here...
      ],
    },
    // Add more days here...
  ];

  // useState hooks
  const [stateChanged, setStateChanged] = useState(0);
  const [displayWeightInPercent, setDisplayWeightInPercent] = useState(false);
  const [displayRecords, setDisplayRecords] = useState(false);
  const [weeklyExercisePlan, setWeeklyExercisePlan] = useState(
    initialWeeklyExercisePlan
  );

  // useSelector hooks
  const dispatch = useDispatch();
  const exercisesNameList = useSelector(selectExerciseNames);
  const strengthRecords = useSelector((state) => state.strengthRecords.records);

  // Derived state
  const powerlifts = strengthRecords.filter((record) =>
    powerlifts_exercises.includes(record.exercise)
  );

  // Debugging logs
  const latestPowerlifts = powerlifts.reduce((latest, record) => {
    console.log("Record", record);
    console.log("Latest", latest);
    if (
      !latest[record.exercise] ||
      record.record_date > latest[record.exercise][0].record_date
    ) {
      latest[record.exercise] = [];
      latest[record.exercise].push(record);
    }
    return latest;
  }, {});

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
                const newWeekLoad =
                  initialWeeklyExercisePlan[0].exercises[0].weeks[0];

                newState[dayIndex].exercises[exerciseIndex].weeks.push(
                  newWeekLoad
                );
              } else if (exercise.weeks.length > totalWeeks) {
                newState[dayIndex].exercises[exerciseIndex].weeks =
                  exercise.weeks.slice(0, totalWeeks);
              }
            });
          });

          return newState;
        });
      }
    );
  }, [weekNumber, stateChanged]);

  const handleExerciseChange = (dayIndex, exerciseIndex, newExerciseName) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];

      // Update the exercise name
      newState[dayIndex].exercises[exerciseIndex].name = newExerciseName;

      return newState;
    });
  };

  const handleAddExercise = (dayIndex) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = [...prevState];
      const newExercise = initialWeeklyExercisePlan[0].exercises[0];
      newState[dayIndex].exercises.push(newExercise);
      setStateChanged(stateChanged + 1);

      return newState;
    });
  };

  const handleExerciseDetailChange = (
    dayIndex,
    exerciseIndex,
    weekIndex,
    newValue,
    detailType
  ) => {
    setWeeklyExercisePlan((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[dayIndex].exercises[exerciseIndex].weeks[weekIndex][detailType] =
        newValue;
      console.log("HandleExerciseDetailChange", newState);
      console.log("DetailType", detailType);
      return newState;
    });
  };

  return (
    <div className="form-container">
      <h4 className="header-container">Phase programming</h4>
      <PhaseOption
        displayWeightInPercent={displayWeightInPercent}
        setDisplayWeightInPercent={setDisplayWeightInPercent}
        displayRecords={displayRecords}
        setDisplayRecords={setDisplayRecords}
      />
      {displayRecords && (
        <RecordDisplay
          formData={latestPowerlifts}
          isPowerlifts={true}
          simple={true}
          isCycleVersion={true}
          styleClassName={"record-display-container"}
        />
      )}
      {weeklyExercisePlan.map((weeklyPlan, trainingDayIndex) => (
        <div className="training-day-container" key={trainingDayIndex}>
          <div className="week-container">
            <div className="week-label">
              <label>Day {trainingDayIndex + 1}:</label>
            </div>

            <WeekLabels weeksNumber={totalWeeks} />
          </div>

          <WeeklyExercises
            weeklyExercisePlan={weeklyExercisePlan}
            weekNumber={totalWeeks}
            exercisesNumber={
              weeklyExercisePlan[trainingDayIndex].exercises.length
            }
            exercisesNameList={exercisesNameList}
            trainingDayIndex={trainingDayIndex}
            handleExerciseChange={handleExerciseChange}
            handleExerciseDetailChange={handleExerciseDetailChange}
            displayWeightInPercent={displayWeightInPercent}
          />

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
