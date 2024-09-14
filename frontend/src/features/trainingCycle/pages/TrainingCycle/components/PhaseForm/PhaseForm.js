// React and Redux imports
import React, { useEffect, useState } from "react";

// Feature-related imports
import useExerciseNames from "features/trainingCycle/hooks/useExerciseNames";
import useUpdateSessionsNumber from "features/trainingCycle/hooks/PhaseForm/useUpdateSessionsNumber";
import useUpdateMicrocyclesNumber from "features/trainingCycle/hooks/PhaseForm/useUpdateMicrocyclesNumber";
import useAutoClearStatus from "features/trainingCycle/hooks/PhaseForm/useAutoClearStatus";
import useHandleExerciseChange from "features/trainingCycle/hooks/handlers/useHandleExerciseChange";
import useHandleAddExercise from "features/trainingCycle/hooks/handlers/useHandleAddExercise";
import useHandleExerciseDetailChange from "features/trainingCycle/hooks/handlers/useHandleExerciseDetailChange";

// Component imports
import RecordsDisplayContainer from "./RecordsDisplayContainer";
import TrainingSessionContainer from "../Shared/TrainingSessionContainer";
import CycleSelectGroupOptions from "../Shared/CycleSelectGroupOptions";

// Style imports
import "./PhaseForm.css";
import useAddPhase from "features/trainingCycle/hooks/PhaseForm/useAddPhase";
import usePhaseFormStatus from "features/trainingCycle/hooks/PhaseForm/usePhaseFormStatus";

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

const PhaseForm = ({
  mesocycleId,
  cycleFormValues,
  handleMultipleInputChanges,
}) => {
  // Destructure cycleFormValues
  const {
    phaseType,
    phaseStartDate,
    phaseEndDate,
    phaseDurationInWeeks: microcyclesNumber,
    trainingDays: trainingSessionsNumber,
  } = cycleFormValues;

  // useState hooks
  const [stateChanged, setStateChanged] = useState(0);
  const [displayRecords, setDisplayRecords] = useState(false);
  const [displayWeightInPercent, setDisplayWeightInPercent] = useState(false);
  const [displayPercentageCalc, setDisplayPercentageCalc] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState(null);
  const [phaseTrainingProgram, setPhaseTrainingProgram] =
    useState(initialPhaseProgram);

  // Custom hooks
  const isPhaseFormActive = usePhaseFormStatus(phaseEndDate, addRequestStatus);
  const exerciseNamesList = useExerciseNames();
  const handleExerciseChange = useHandleExerciseChange(setPhaseTrainingProgram);
  const handleAddExercise = useHandleAddExercise(
    setPhaseTrainingProgram,
    initialPhaseProgram,
    setStateChanged,
    stateChanged,
    microcyclesNumber ? parseInt(microcyclesNumber, 10) : 1
  );
  const handleExerciseDetailChange = useHandleExerciseDetailChange(
    setPhaseTrainingProgram
  );
  const count = useAutoClearStatus(addRequestStatus, setAddRequestStatus);

  // Custom hooks for updating sessions and microcycles
  useUpdateSessionsNumber(
    initialPhaseProgram,
    setPhaseTrainingProgram,
    trainingSessionsNumber ? parseInt(trainingSessionsNumber, 10) : 1,
    setStateChanged
  );
  useUpdateMicrocyclesNumber(
    stateChanged,
    setPhaseTrainingProgram,
    initialPhaseProgram,
    microcyclesNumber ? parseInt(microcyclesNumber, 10) : 1
  );

  // Function to reset the form
  const resetForm = () => {
    handleMultipleInputChanges({
      trainingDays: 0,
      phaseDurationInWeeks: 1,
    });
    setPhaseTrainingProgram(initialPhaseProgram);
  };

  // Function to handle adding a phase
  const handleAddPhase = useAddPhase(
    mesocycleId,
    phaseType,
    phaseStartDate,
    phaseEndDate,
    microcyclesNumber,
    phaseTrainingProgram,
    setAddRequestStatus,
    resetForm
  );

  return isPhaseFormActive ? (
    <div className="form-container">
      <h3>Microcycle programming</h3>
      <CycleSelectGroupOptions
        options={[
          {
            id: 1,
            label: "Weight in percent of 1RM",
            checked: displayWeightInPercent,
            onChange: setDisplayWeightInPercent,
          },
          {
            id: 2,
            label: "Show Strength Records",
            checked: displayRecords,
            onChange: setDisplayRecords,
          },
          {
            id: 3,
            label: "Percentage Calculator",
            checked: displayPercentageCalc,
            onChange: setDisplayPercentageCalc,
          },
        ]}
      />
      {displayRecords && <RecordsDisplayContainer />}
      {displayPercentageCalc && <p>Percentage Calculator</p>}

      <div className="training-phase-form">
        {phaseTrainingProgram.map((_, trainingSessionIndex) => (
          <TrainingSessionContainer
            key={trainingSessionIndex}
            trainingSessionIndex={trainingSessionIndex}
            totalMicrocyclesNumber={
              microcyclesNumber ? parseInt(microcyclesNumber, 10) : 1
            }
            phaseTrainingProgram={phaseTrainingProgram}
            exerciseNamesList={exerciseNamesList}
            handleExerciseChange={handleExerciseChange}
            handleExerciseDetailChange={handleExerciseDetailChange}
            handleAddExercise={handleAddExercise}
            displayWeightInPercent={displayWeightInPercent}
            isEditable={true}
          />
        ))}

        {addRequestStatus && (
          <p className="tcf-info">
            {addRequestStatus}
            {".".repeat(count)}
          </p>
        )}
        <div className="button-container" onClick={handleAddPhase}>
          <button>Add phase</button>
        </div>
      </div>
    </div>
  ) : (
    <p className="tcf-phase-warning">Can't add phase!</p>
  );
};

export default PhaseForm;
