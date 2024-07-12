import React, { useEffect, useState } from "react";
// React Router (if applicable)
// Other external libraries (like styled-components)
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

// Feature-related imports
import { getExercises } from "features/trainingLogs/exercises";
import {
  addPhase,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";

// Component imports
import PhaseOption from "./components/PhaseOption";
import RecordsDisplayContainer from "./components/RecordsDisplayContainer";
import TrainingSessionContainer from "./components/TrainingSessionContainer";
import CycleTimeline from "./CycleTimeline";

// Style imports (if any)
import "./PhaseForm.css";

// Use the createSelector function from the @reduxjs/toolkit package to create a selector function that returns the exercises state from the Redux store.
// And avoid using the useSelector hook directly in the component file, which create new selector functions every time the component renders.
const selectExercisesState = (state) => state.exercises.exercises;

const selectExerciseNames = createSelector(
  [selectExercisesState],

  (exercises) => exercises.map((exercise) => exercise.name)
);

const PhaseForm = ({
  mesocycle,
  phase,
  phaseStartDate,
  phaseEndDate,
  weeksNumber: microcyclesNumber,
  trainingDays: trainingSessions,
  isPhaseFormActive,
}) => {
  const totalMicrocyclesNumber = microcyclesNumber
    ? parseInt(microcyclesNumber, 10)
    : 1;
  const totalTrainingSessionsNumber = trainingSessions
    ? parseInt(trainingSessions, 10)
    : 1;

  const initialPhaseProgram = [
    {
      dayNumber: 1,
      exercises: [
        {
          exercise: "Squat",
          microcycles: [
            {
              weight: 0,
              repetitions: 0,
              sets: 0,
            },
          ],
        },
      ],
    },
  ];

  const trainingCycle = [
    {
      name: "Phase 1",
      type: "hypertrophy",
      duration: 3,
    },
    {
      name: "Phase 2",
      type: "strength",
      duration: 4,
    },
    // More phases...
  ];
  // useState hooks
  const [stateChanged, setStateChanged] = useState(0);
  const [displayWeightInPercent, setDisplayWeightInPercent] = useState(false);
  const [displayRecords, setDisplayRecords] = useState(false);
  const [displayMesocycleTimeline, setDisplayMesocycleTimeline] =
    useState(false);
  const [phaseTrainingProgram, setPhaseTrainingProgram] =
    useState(initialPhaseProgram);

  // useSelector hooks
  const dispatch = useDispatch();
  const exercisesNameList = useSelector(selectExerciseNames);

  useEffect(() => {
    if (!exercisesNameList.length) {
      dispatch(getExercises());
    }
  }, [exercisesNameList]);

  // Helper functions
  const updateTrainingDays = (
    prevState,
    totalTrainingDays,
    initialExercises
  ) => {
    return Array.from({ length: totalTrainingDays }, (_, i) => {
      if (!prevState[i]) {
        return {
          dayNumber: i + 1,
          exercises: initialExercises,
        };
      } else {
        return prevState[i];
      }
    });
  };

  const updateTrainingWeeks = (
    prevState,
    totalMicrocycles,
    newMicrocycleLoad
  ) => {
    return prevState.map((day) => {
      day.exercises = day.exercises.map((exercise) => {
        const currentMicrocyclesCount = exercise.microcycles.length;
        const microcyclesToAdd = totalMicrocycles - currentMicrocyclesCount;

        if (microcyclesToAdd > 0) {
          // Add the required number of microcycles
          return {
            ...exercise,
            microcycles: [
              ...exercise.microcycles,
              ...Array(microcyclesToAdd).fill(newMicrocycleLoad),
            ],
          };
        } else if (microcyclesToAdd < 0) {
          // Trim the microcycles to the new total
          return {
            ...exercise,
            microcycles: exercise.microcycles.slice(0, totalMicrocycles),
          };
        } else {
          // No change needed
          return exercise;
        }
      });

      return day;
    });
  };

  // Inside your component
  useEffect(() => {
    const initialExercises = initialPhaseProgram[0].exercises;
    setPhaseTrainingProgram((prevState) =>
      updateTrainingDays(
        prevState,
        totalTrainingSessionsNumber,
        initialExercises
      )
    );
    setStateChanged(stateChanged + 1);
  }, [trainingSessions]);

  useEffect(() => {
    const newMicrocycleLoad =
      initialPhaseProgram[0].exercises[0].microcycles[0];
    setPhaseTrainingProgram((prevState) =>
      updateTrainingWeeks(prevState, totalMicrocyclesNumber, newMicrocycleLoad)
    );
  }, [microcyclesNumber, stateChanged]);

  const handleExerciseChange = (
    trainingSessionIndex,
    exerciseIndex,
    newExerciseName
  ) => {
    setPhaseTrainingProgram((prevState) => {
      const newState = [...prevState];

      // Update the exercise name
      newState[trainingSessionIndex].exercises[exerciseIndex].exercise =
        newExerciseName;

      return newState;
    });
  };

  const handleAddExercise = (trainingSessionIndex) => {
    setPhaseTrainingProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      const newExercise = initialPhaseProgram[0].exercises[0];
      newState[trainingSessionIndex].exercises.push(newExercise);
      setStateChanged(stateChanged + 1);

      return newState;
    });
  };

  const handleExerciseDetailChange = (
    trainingSessionIndex,
    exerciseIndex,
    microcycleIndex,
    newValue,
    detailType
  ) => {
    setPhaseTrainingProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[trainingSessionIndex].exercises[exerciseIndex].microcycles[
        microcycleIndex
      ][detailType] = newValue;
      return newState;
    });
  };

  const handleAddPhase = () => {
    const phaseData = {
      mesocycle: mesocycle,
      type: phase,
      start_date: phaseStartDate,
      end_date_: phaseEndDate,
      duration: microcyclesNumber,
      training_sessions: phaseTrainingProgram,
    };
    dispatch(addPhase(phaseData));
    dispatch(updateUpdateTrigger());
  };

  return (
    <div className="form-container">
      <PhaseOption
        displayWeightInPercent={displayWeightInPercent}
        setDisplayWeightInPercent={setDisplayWeightInPercent}
        displayRecords={displayRecords}
        setDisplayRecords={setDisplayRecords}
        displayMesocycleTimeline={displayMesocycleTimeline}
        setDisplayMesocycleTimeline={setDisplayMesocycleTimeline}
      />
      {displayRecords && <RecordsDisplayContainer />}
      {displayMesocycleTimeline && (
        <CycleTimeline trainingCycle={trainingCycle} />
      )}
      {isPhaseFormActive && (
        <div className="training-phase-form">
          {phaseTrainingProgram.map((_, trainingSessionIndex) => (
            <TrainingSessionContainer
              trainingSessionIndex={trainingSessionIndex}
              totalMicrocyclesNumber={totalMicrocyclesNumber}
              phaseTrainingProgram={phaseTrainingProgram}
              exercisesNameList={exercisesNameList}
              handleExerciseChange={handleExerciseChange}
              handleExerciseDetailChange={handleExerciseDetailChange}
              handleAddExercise={handleAddExercise}
              displayWeightInPercent={displayWeightInPercent}
            />
          ))}

          <div className="button-container" onClick={handleAddPhase}>
            <button>Add phase</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseForm;
