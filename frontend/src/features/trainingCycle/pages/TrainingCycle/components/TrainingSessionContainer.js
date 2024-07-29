import React from "react";
import WeekLabels from "./WeekLabels";
import TrainingSession from "./TrainingSession";

const TrainingSessionContainer = ({
  trainingSessionIndex,
  totalMicrocyclesNumber,
  phaseTrainingProgram,
  exerciseNamesList,
  handleAddExercise,
  handleExerciseChange,
  handleExerciseDetailChange,
  displayWeightInPercent,
  isEditable,
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
        exerciseNamesList={exerciseNamesList}
        trainingDayIndex={trainingSessionIndex}
        handleExerciseChange={handleExerciseChange}
        handleExerciseDetailChange={handleExerciseDetailChange}
        displayWeightInPercent={displayWeightInPercent}
        isEditable={isEditable}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            totalMicrocyclesNumber + 1
          }, minmax(180px, 1fr))`,
        }}
      >
        {isEditable && (
          <div className="button-container">
            <button onClick={() => handleAddExercise(trainingSessionIndex)}>
              Add exercise
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrainingSessionContainer;
