import React from "react";

const SelectExerciseField = ({
  phaseTrainingProgram,
  exercisesNameList,
  exerciseIndex,
  dayIndex,
  handleExerciseChange,
  isEditable,
}) => {
  if (!phaseTrainingProgram[dayIndex]?.exercises[exerciseIndex]) {
    return null;
  }

  return (
    <div className="exercise-select-container">
      <select
        className="exercise-select"
        value={phaseTrainingProgram[dayIndex].exercises[exerciseIndex].exercise}
        onChange={(e) =>
          handleExerciseChange(dayIndex, exerciseIndex, e.target.value)
        }
        disabled={!isEditable}
      >
        {exercisesNameList.map((exerciseName) => (
          <option key={exerciseName} value={exerciseName}>
            {exerciseName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectExerciseField;
