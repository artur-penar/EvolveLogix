// React and Redux imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Feature-related imports
import {
  addPhase,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";
import useExerciseNames from "features/trainingCycle/hooks/useExerciseNames";
import useUpdateSessionsNumber from "features/trainingCycle/hooks/useUpdateSessionsNumber";
import useUpdateMicrocyclesNumber from "features/trainingCycle/hooks/useUpdateMicrocyclesNumber";
import useHandleExerciseChange from "features/trainingCycle/hooks/handlers/useHandleExerciseChange";
import useHandleAddExercise from "features/trainingCycle/hooks/handlers/useHandleAddExercise";
import useHandleExerciseDetailChange from "features/trainingCycle/hooks/handlers/useHandleExerciseDetailChange";

// Component imports
import RecordsDisplayContainer from "./RecordsDisplayContainer";
import TrainingSessionContainer from "../Shared/TrainingSessionContainer";
import CycleSelectGroupOptions from "../Shared/CycleSelectGroupOptions";

// Style imports
import "./PhaseForm.css";

const PhaseForm = ({
  mesocycleId,
  phaseType,
  phaseStartDate,
  phaseEndDate,
  weeksNumber: microcyclesNumber,
  trainingDays: trainingSessionsNumber,
  isPhaseFormActive,
}) => {
  // useState hooks
  const [stateChanged, setStateChanged] = useState(0);
  const [displayWeightInPercent, setDisplayWeightInPercent] = useState(false);
  const [displayRecords, setDisplayRecords] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState(null);
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

  const [phaseTrainingProgram, setPhaseTrainingProgram] =
    useState(initialPhaseProgram);

  // Custom hooks
  const exerciseNamesList = useExerciseNames();
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

  // useDispatch hook
  const dispatch = useDispatch();

  useEffect(() => {
    if (addRequestStatus) {
      const timer = setTimeout(() => {
        setAddRequestStatus(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [addRequestStatus]);

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

  // Event handler for adding a phase
  const handleAddPhase = async () => {
    const phaseData = {
      mesocycle: mesocycleId,
      type: phaseType,
      start_date: phaseStartDate,
      end_date_: phaseEndDate,
      duration: microcyclesNumber,
      training_sessions: phaseTrainingProgram,
    };

    const resultAction = await dispatch(addPhase(phaseData));
    if (resultAction.meta.requestStatus === "fulfilled") {
      setAddRequestStatus("Phase added successfully");
    } else if (resultAction.meta.requestStatus === "rejected") {
      const errorPayload = resultAction.payload;
      if (errorPayload && errorPayload.mesocycle) {
        setAddRequestStatus(
          <>
            Adding Phase failed
            <br />
            Mesocycle: {errorPayload.mesocycle[0]}
          </>
        );
      }
    }

    dispatch(updateUpdateTrigger());
  };

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
        ]}
      />
      {displayRecords && <RecordsDisplayContainer />}

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

        {addRequestStatus && <pre className="tcf-info">{addRequestStatus}</pre>}
        <div className="button-container" onClick={handleAddPhase}>
          <button>Add phase</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PhaseForm;
