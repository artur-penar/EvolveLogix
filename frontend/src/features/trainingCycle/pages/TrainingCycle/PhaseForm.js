import React, { useEffect, useState } from "react";
// React Router (if applicable)
// Other external libraries (like styled-components)
import { useDispatch, useSelector } from "react-redux";

// Feature-related imports
import { getExercises } from "features/trainingLogs/exercises";
import {
  addPhase,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";

// Component imports
import RecordsDisplayContainer from "./components/RecordsDisplayContainer";
import TrainingSessionContainer from "./components/TrainingSessionContainer";
import CycleSelectGroupOptions from "./components/CycleSelectGroupOptions";
import useExerciseNames from "features/trainingCycle/hooks/useExerciseNames";

// Style imports (if any)
import "./PhaseForm.css";
import {
  updateTrainingDays,
  updateTrainingWeeks,
} from "features/trainingCycle/utils/updatePhaseDetails";

const PhaseForm = ({
  mesocycleId,
  phaseType,
  phaseStartDate,
  phaseEndDate,
  weeksNumber: microcyclesNumber,
  trainingDays: trainingSessionsNumber,
  isPhaseFormActive,
}) => {
  const totalMicrocyclesNumber = microcyclesNumber
    ? parseInt(microcyclesNumber, 10)
    : 1;
  const totalTrainingSessionsNumber = trainingSessionsNumber
    ? parseInt(trainingSessionsNumber, 10)
    : 1;

  const exerciseNamesList = useExerciseNames();

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

  // useState hooks
  const [stateChanged, setStateChanged] = useState(0);
  const [displayWeightInPercent, setDisplayWeightInPercent] = useState(false);
  const [displayRecords, setDisplayRecords] = useState(false);
  useState(false);
  const [phaseTrainingProgram, setPhaseTrainingProgram] =
    useState(initialPhaseProgram);

  // useSelector hooks
  const dispatch = useDispatch();
  // const exerciseNamesList = useSelector(selectExerciseNames);

  // useEffect(() => {
  //   if (!exerciseNamesList.length) {
  //     dispatch(getExercises());
  //   }
  // }, [exerciseNamesList]);

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
  }, [totalTrainingSessionsNumber]);

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
      // const newState = [...prevState];
      const newState = JSON.parse(JSON.stringify(prevState));

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
      mesocycle: mesocycleId,
      type: phaseType,
      start_date: phaseStartDate,
      end_date_: phaseEndDate,
      duration: microcyclesNumber,
      training_sessions: phaseTrainingProgram,
    };
    dispatch(addPhase(phaseData));
    dispatch(updateUpdateTrigger());
  };

  return isPhaseFormActive ? (
    <div className="form-container">
      <h3>Microcycle programming</h3>
      <CycleSelectGroupOptions
        options={[
          {
            label: "Weight in percent of 1RM",
            checked: displayWeightInPercent,
            onChange: setDisplayWeightInPercent,
          },
          {
            label: "Show Strength Records",
            checked: displayRecords,
            onChange: setDisplayRecords,
          },
        ]}
      />
      {displayRecords && <RecordsDisplayContainer />}

      <div className="training-phase-form">
        {phaseTrainingProgram.map((_, trainingSessionIndex) => (
          <TrainingSessionContainer
            trainingSessionIndex={trainingSessionIndex}
            totalMicrocyclesNumber={totalMicrocyclesNumber}
            phaseTrainingProgram={phaseTrainingProgram}
            exerciseNamesList={exerciseNamesList}
            handleExerciseChange={handleExerciseChange}
            handleExerciseDetailChange={handleExerciseDetailChange}
            handleAddExercise={handleAddExercise}
            displayWeightInPercent={displayWeightInPercent}
            isEditable={true}
          />
        ))}

        <div className="button-container" onClick={handleAddPhase}>
          <button>Add phase</button>
        </div>
      </div>
    </div>
  ) : null; // Or any other fallback content
};

export default PhaseForm;
