import React from "react";
import SelectExerciseField from "./SelectExerciseField";
import ExerciseParameterInput from "./ExerciseParameterInput";

const TrainingSession = ({
  phaseTrainingProgram,
  totalMicrocyclesNumber,
  exercisesNumber,
  exerciseNamesList,
  trainingDayIndex,
  handleExerciseChange,
  handleExerciseDetailChange,
  displayWeightInPercent,
  isEditable,
}) => {
  if (!phaseTrainingProgram[trainingDayIndex]) {
    return null;
  }

  return Array.from({ length: exercisesNumber }, (_, i) => i).map(
    (exerciseIndex) => (
      <div key={exerciseIndex} className="week-container">
        <SelectExerciseField
          phaseTrainingProgram={phaseTrainingProgram}
          exerciseNamesList={exerciseNamesList}
          exerciseIndex={exerciseIndex}
          dayIndex={trainingDayIndex}
          handleExerciseChange={handleExerciseChange}
          isEditable={isEditable}
        />
        {Array.from({ length: totalMicrocyclesNumber }, (_, i) => i).map(
          (microcycleIndex) => (
            <div key={microcycleIndex} className="exercise-inputs-container">
              <ExerciseParameterInput
                trainingDayIndex={trainingDayIndex}
                exerciseIndex={exerciseIndex}
                weekIndex={microcycleIndex}
                value={
                  phaseTrainingProgram[trainingDayIndex]?.exercises[
                    exerciseIndex
                  ]?.microcycles[microcycleIndex]?.weight
                }
                handleChange={handleExerciseDetailChange}
                detailType="weight"
                displayWeightInPercent={displayWeightInPercent}
                isEditable={isEditable}
              />
              <label>x</label>
              <ExerciseParameterInput
                trainingDayIndex={trainingDayIndex}
                exerciseIndex={exerciseIndex}
                weekIndex={microcycleIndex}
                value={
                  phaseTrainingProgram[trainingDayIndex]?.exercises[
                    exerciseIndex
                  ]?.microcycles[microcycleIndex]?.repetitions
                }
                handleChange={handleExerciseDetailChange}
                detailType="repetitions"
                isEditable={isEditable}
              />
              <label>x</label>
              <ExerciseParameterInput
                trainingDayIndex={trainingDayIndex}
                exerciseIndex={exerciseIndex}
                weekIndex={microcycleIndex}
                value={
                  phaseTrainingProgram[trainingDayIndex]?.exercises[
                    exerciseIndex
                  ]?.microcycles[microcycleIndex]?.sets
                }
                handleChange={handleExerciseDetailChange}
                detailType="sets"
                isEditable={isEditable}
              />
            </div>
          )
        )}
      </div>
    )
  );
};

export default TrainingSession;
