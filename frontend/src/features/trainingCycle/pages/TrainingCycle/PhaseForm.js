// React and Redux imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Feature-related imports
import {
  addPhase,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";
import useExerciseNames from "features/trainingCycle/hooks/useExerciseNames";
import useUpdateSessionsNumber from "features/trainingCycle/hooks/useUpdateSessionsNumber";
import useUpdateMicrocyclesNumber from "features/trainingCycle/hooks/useUpdateMicrocyclesNumber";

// Component imports
import RecordsDisplayContainer from "./components/RecordsDisplayContainer";
import TrainingSessionContainer from "./components/TrainingSessionContainer";
import CycleSelectGroupOptions from "./components/CycleSelectGroupOptions";
import useHandleExerciseChange from "features/trainingCycle/hooks/handlers/useHandleExerciseChange";

// Style imports
import "./PhaseForm.css";
import useHandleAddExercise from "features/trainingCycle/hooks/handlers/useHandleAddExercise";
import useHandleExerciseDetailChange from "features/trainingCycle/hooks/handlers/useHandleExerciseDetailChange";

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
  const [phaseTrainingProgram, setPhaseTrainingProgram] =
    useState(initialPhaseProgram);

  // Custom hooks
  const handleExerciseChange = useHandleExerciseChange(setPhaseTrainingProgram);
  const handleAddExercise = useHandleAddExercise(
    setPhaseTrainingProgram,
    initialPhaseProgram,
    setStateChanged,
    stateChanged
  );
  const handleExerciseDetailChange = useHandleExerciseDetailChange(
    setPhaseTrainingProgram
  );

  // useSelector hooks
  const dispatch = useDispatch();

  // Inside your component
  useUpdateSessionsNumber(
    initialPhaseProgram,
    setPhaseTrainingProgram,
    totalTrainingSessionsNumber,
    setStateChanged
  );
  useUpdateMicrocyclesNumber(
    stateChanged,
    setPhaseTrainingProgram,
    initialPhaseProgram,
    totalMicrocyclesNumber
  );

  // const handleExerciseDetailChange = (
  //   trainingSessionIndex,
  //   exerciseIndex,
  //   microcycleIndex,
  //   newValue,
  //   detailType
  // ) => {
  //   setPhaseTrainingProgram((prevState) => {
  //     const newState = JSON.parse(JSON.stringify(prevState));
  //     newState[trainingSessionIndex].exercises[exerciseIndex].microcycles[
  //       microcycleIndex
  //     ][detailType] = newValue;
  //     return newState;
  //   });
  // };

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
