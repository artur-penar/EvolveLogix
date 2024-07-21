import React, { useEffect, useState } from "react";
import TrainingSessionContainer from "./TrainingSessionContainer";
import "./PhaseDisplay.css";

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

const PhaseDisplay = ({ phasesData }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState("");
  const [processedSelectedPhaseData, setProcessedSelectedPhaseData] = useState(
    []
  );
  const phaseSelectionOptions = phasesData.map((phase) => ({
    id: phase.id,
    type: phase.type,
  }));

  useEffect(() => {
    if (phaseSelectionOptions.length && selectedPhaseId === "")
      setSelectedPhaseId(phaseSelectionOptions[0].id);
  }, [phasesData]);

  useEffect(() => {
    const selectedPhaseData = phasesData.find(
      (phase) => phase.id == selectedPhaseId
    );
    setProcessedSelectedPhaseData(processPhaseData(selectedPhaseData));
  }, [selectedPhaseId]);

  if (!processedSelectedPhaseData.length) {
    return null;
  }

  return (
    <div className="phase-display-container">
      <h3>Phase Display</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label>Phase name: </label>
        <select
          value={selectedPhaseId}
          onChange={(e) => setSelectedPhaseId(e.target.value)}
        >
          {phaseSelectionOptions.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {phase.type}
            </option>
          ))}
        </select>
      </div>
      {processedSelectedPhaseData.map((_, trainingSessionIndex) => (
        <TrainingSessionContainer
          trainingSessionIndex={trainingSessionIndex}
          totalMicrocyclesNumber={processedSelectedPhaseData.length}
          phaseTrainingProgram={processedSelectedPhaseData}
          exercisesNameList={["Squat", "Bench press", "Deadlift"]}
          handleExerciseChange={() => {}}
          handleExerciseDetailChange={() => {}}
          handleAddExercise={() => {}}
          displayWeightInPercent={false}
          isEditable={false}
        />
      ))}
    </div>
  );
};

export default PhaseDisplay;
