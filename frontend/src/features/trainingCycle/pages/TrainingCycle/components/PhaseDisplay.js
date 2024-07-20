import React from "react";
import TrainingSessionContainer from "./TrainingSessionContainer";
import "./PhaseDisplay.css";

const PhaseDisplay = ({ phaseData: phaseTrainingProgram }) => {
  return (
    <div className="phase-display-container">
      <h3>Phase Display</h3>
      {phaseTrainingProgram.map((_, trainingSessionIndex) => (
        <TrainingSessionContainer
          trainingSessionIndex={trainingSessionIndex}
          totalMicrocyclesNumber={3}
          phaseTrainingProgram={phaseTrainingProgram}
          exercisesNameList={["Squat", "Bench press", "Deadlift"]}
          handleExerciseChange={() => {}}
          handleExerciseDetailChange={() => {}}
          handleAddExercise={() => {}}
          displayWeightInPercent={false}
        />
      ))}
    </div>
  );
};

export default PhaseDisplay;
