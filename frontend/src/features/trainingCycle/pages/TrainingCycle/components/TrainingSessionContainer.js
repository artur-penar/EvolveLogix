import React from "react";
import WeekLabels from "./WeekLabels";
import TrainingSession from "./TrainingSession";

const TrainingSessionContainer = ({
  trainingSessionIndex,
  totalMicrocyclesNumber,
  phaseTrainingProgram,
  exercisesNameList,
  handleAddExercise,
  handleExerciseChange,
  handleExerciseDetailChange,
  displayWeightInPercent,
}) => {
  return (
    <div className="training-day-container" key={trainingSessionIndex}>
      <div className="week-container">
        <div className="week-label">
          <label>Day: {trainingSessionIndex + 1}</label>
        </div>

        <WeekLabels weeksNumber={totalMicrocyclesNumber} />
      </div>

      <TrainingSession
        phaseTrainingProgram={phaseTrainingProgram}
        totalMicrocyclesNumber={totalMicrocyclesNumber}
        exercisesNumber={
          phaseTrainingProgram[trainingSessionIndex].exercises.length
        }
        exercisesNameList={exercisesNameList}
        trainingDayIndex={trainingSessionIndex}
        handleExerciseChange={handleExerciseChange}
        handleExerciseDetailChange={handleExerciseDetailChange}
        displayWeightInPercent={displayWeightInPercent}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            totalMicrocyclesNumber + 1
          }, minmax(180px, 1fr))`,
        }}
      >
        <div className="button-container">
          <button onClick={() => handleAddExercise(trainingSessionIndex)}>
            Add exercise
          </button>
        </div>
      </div>
    </div>
  );
};
export default TrainingSessionContainer;
