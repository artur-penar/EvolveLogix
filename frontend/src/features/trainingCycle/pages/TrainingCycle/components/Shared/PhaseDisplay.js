import React, { useEffect, useState } from "react";
import TrainingSessionContainer from "./TrainingSessionContainer";
import DateInput from "./DateInput";
import "./PhaseDisplay.css";
import { useSelector } from "react-redux";
import { selectExerciseNames } from "features/trainingLogs/selectors";

const processPhaseData = (data) => {
  if (!data) return [];
  const trainingSessions = data.training_sessions;
  return trainingSessions.map(({ order, exercises }) => ({
    dayNumber: order,
    exercises: exercises.map(({ exercise, microcycles }) => ({
      exercise,
      microcycles, // Include microcycles here
    })),
  }));
};

const PhaseDisplay = ({
  phasesData,
  isLabelVisible = true,
  enableSelect = true,
}) => {
  const exerciseNamesList = useSelector(selectExerciseNames);
  const [selectedPhaseId, setSelectedPhaseId] = useState("");
  const [selectedPhaseStartDate, setSelectedPhaseStartDate] = useState("");
  const [selectedPhaseEndDate, setSelectedPhaseEndDate] = useState("");
  const [processedSelectedPhaseData, setProcessedSelectedPhaseData] = useState(
    []
  );
  const phaseSelectionOptions = phasesData.map(({ id, type }) => ({
    id: id,
    type: type,
  }));

  useEffect(() => {
    if (phaseSelectionOptions.length)
      setSelectedPhaseId(phaseSelectionOptions[0].id);
  }, [phasesData]);

  useEffect(() => {
    if (!selectedPhaseId) return;

    const selectedPhaseData = phasesData.find(
      (phase) => phase.id == selectedPhaseId
    );
    if (!selectedPhaseData) return;
    setProcessedSelectedPhaseData(processPhaseData(selectedPhaseData));
    setSelectedPhaseStartDate(selectedPhaseData.start_date);
    setSelectedPhaseEndDate(selectedPhaseData.end_date);
  }, [selectedPhaseId, phasesData]);

  if (!processedSelectedPhaseData.length) {
    return null;
  }

  return (
    <div className="phase-display-container">
      {isLabelVisible && <h3>Phase details</h3>}
      <div className="tcf-select-container">
        <div className="tcf-flex-column">
          <div className="tcf-select-group">
            <label className="tcf-select-label">Phase type: </label>
            <select
              className="tcf-select-control form-control"
              value={selectedPhaseId}
              onChange={(e) => setSelectedPhaseId(e.target.value)}
              aria-label="Select Phase"
              disabled={!enableSelect}
            >
              {phaseSelectionOptions.map(({ id, type }, index) => (
                <option key={id} value={id}>
                  {enableSelect ? `${index + 1}. ` : ""}
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="tcf-flex-column">
          <DateInput label="Start date" value={selectedPhaseStartDate} />
          <DateInput label="End date" value={selectedPhaseEndDate} />
        </div>
      </div>
      {processedSelectedPhaseData.map((phaseData, trainingSessionIndex) => {
        const { exercises } = phaseData;
        const { microcycles } = exercises[0];
        const microcyclesNumber = microcycles.length;

        return (
          <TrainingSessionContainer
            key={trainingSessionIndex}
            trainingSessionIndex={trainingSessionIndex}
            totalMicrocyclesNumber={microcyclesNumber}
            phaseTrainingProgram={processedSelectedPhaseData}
            exerciseNamesList={exerciseNamesList}
            handleExerciseChange={() => {}}
            handleExerciseDetailChange={() => {}}
            handleAddExercise={() => {}}
            displayWeightInPercent={false}
            isEditable={false}
          />
        );
      })}
    </div>
  );
};

export default PhaseDisplay;
