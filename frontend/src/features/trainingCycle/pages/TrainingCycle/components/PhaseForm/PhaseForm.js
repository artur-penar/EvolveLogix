// React and Redux imports
import React, { useEffect, useState } from "react";

// Feature-related imports
import useExerciseNames from "features/trainingCycle/hooks/useExerciseNames";
import useUpdateSessionsNumber from "features/trainingCycle/hooks/PhaseForm/useUpdateSessionsNumber";
import useUpdateMicrocyclesNumber from "features/trainingCycle/hooks/PhaseForm/useUpdateMicrocyclesNumber";
import useAutoClearStatus from "features/trainingCycle/hooks/PhaseForm/useAutoClearStatus";
import useHandleExerciseChange from "features/trainingCycle/handlers/useHandleExerciseChange";
import useHandleAddExercise from "features/trainingCycle/handlers/useHandleAddExercise";
import useHandleExerciseDetailChange from "features/trainingCycle/handlers/useHandleExerciseDetailChange";

// Component imports
import RecordsDisplayContainer from "./RecordsDisplayContainer";
import TrainingSessionContainer from "../Shared/TrainingSessionContainer";
import CycleSelectGroupOptions from "../Shared/CycleSelectGroupOptions";

import useAddPhase from "features/trainingCycle/hooks/PhaseForm/useAddPhase";
import usePhaseFormStatus from "features/trainingCycle/hooks/PhaseForm/usePhaseFormStatus";
import PercentageCalculator from "./PercentageCalculator";
import useFetchStrengthRecords from "features/trainingCycle/hooks/PhaseForm/useFetchStrengthRecords";
import ContainerHeader from "shared/components/ContainerHeader";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

// Style imports
import "./PhaseForm.css";

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

  // Redux hooks
  const strengthRecords = useFetchStrengthRecords();

  // useState hooks
  const [stateChanged, setStateChanged] = useState(0);
  const [displayRecords, setDisplayRecords] = useState(false);
  const [displayWeightInPercent, setDisplayWeightInPercent] = useState(false);
  const [displayPercentageCalc, setDisplayPercentageCalc] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState(null);
  const [phaseTrainingProgram, setPhaseTrainingProgram] =
    useState(initialPhaseProgram);

  // Options for phase display
  const phaseOptions = [
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
  ];

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
    <div className="form-container bg-containers">
      <ContainerHeader headerContent={"Microcycle programming"} />
      <CycleSelectGroupOptions options={phaseOptions} />
      {displayRecords && <RecordsDisplayContainer />}
      {displayPercentageCalc && (
        <PercentageCalculator strengthRecords={strengthRecords} />
      )}

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
            strengthRecords={strengthRecords}
          />
        ))}

        {addRequestStatus && (
          <p className="tcf-info">
            {addRequestStatus}
            {".".repeat(count)}
          </p>
        )}
        <div className="button-container">
          <Button
            className="add-phase-button"
            variant="outlined"
            size="large"
            sx={{
              color: "green",
              borderColor: "green",
              "&:hover": {
                backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
                borderColor: "green",
              },
            }}
            onClick={handleAddPhase}
          >
            Add phase
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Alert
        variant="filled"
        severity="warning"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem", // Increase font size
        }}
      >
        Can't add phase!
      </Alert>
    </>
  );
};

export default PhaseForm;
