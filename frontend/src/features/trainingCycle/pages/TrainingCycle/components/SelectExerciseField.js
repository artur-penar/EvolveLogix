import React from "react";

const SelectExerciseField = ({
  weeklyExercisePlan,
  exercisesNameList,
  exerciseIndex,
  dayIndex,
  handleExerciseChange,
}) => {
  if (!weeklyExercisePlan[dayIndex]?.exercises[exerciseIndex]) {
    return null;
  }

  return (
    <div className="exercise-select-container">
      <select
        className="exercise-select"
        value={weeklyExercisePlan[dayIndex].exercises[exerciseIndex].name}
        onChange={(e) =>
          handleExerciseChange(dayIndex, exerciseIndex, e.target.value)
        }
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
