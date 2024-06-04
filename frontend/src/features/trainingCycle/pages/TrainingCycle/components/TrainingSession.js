import React from "react";
import SelectExerciseField from "./SelectExerciseField";
import ExerciseParameterInput from "./ExerciseParameterInput";

const TrainingSession = ({
  phaseTrainingProgram,
  totalMicrocyclesNumber,
  exercisesNumber,
  exercisesNameList,
  trainingDayIndex,
  handleExerciseChange,
  handleExerciseDetailChange,
  displayWeightInPercent,
}) => {
  if (!phaseTrainingProgram[trainingDayIndex]) {
    return null;
  }

  return Array.from({ length: exercisesNumber }, (_, i) => i).map(
    (exerciseIndex) => (
      <div key={exerciseIndex} className="week-container">
        <SelectExerciseField
          phaseTrainingProgram={phaseTrainingProgram}
          exercisesNameList={exercisesNameList}
          exerciseIndex={exerciseIndex}
          dayIndex={trainingDayIndex}
          handleExerciseChange={handleExerciseChange}
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
              />
            </div>
          )
        )}
      </div>
    )
  );
};

export default TrainingSession;
