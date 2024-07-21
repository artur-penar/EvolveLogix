import React from "react";
import TrainingSessionContainer from "./TrainingSessionContainer";
import "./PhaseDisplay.css";

const PhaseDisplay = ({ phasesData }) => {
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

  const processedData = processPhaseData(phasesData[phasesData.length - 1]);

  if (!processedData.length) {
    return null;
  }

  return (
    <div className="phase-display-container">
      <h3>Phase Display</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label>Phase name: {phasesData[0].phase}</label>
        <select>
          <option value="mesocycle">Mesocycle</option>
          <option value="macrocycle">Macrocycle</option>
        </select>
      </div>
      {processedData.map((_, trainingSessionIndex) => (
        <TrainingSessionContainer
          trainingSessionIndex={trainingSessionIndex}
          totalMicrocyclesNumber={3}
          phaseTrainingProgram={processedData}
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
