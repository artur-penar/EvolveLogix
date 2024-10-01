import React from "react";

const ExerciseHeader = ({
  exerciseIndex,
  exerciseName,
  exerciseNamesList,
  exercises,
  processedStrengthRecords,
  handleExerciseChange,
  handleSetsNumberChange,
}) => {
  const { weight } = processedStrengthRecords[exerciseName] || {};

  return (
    <div className="exercise-header">
      <label>Nr.{exerciseIndex + 1} :</label>
      <select
        className="exercise-select"
        name="exercise"
        value={exerciseName}
        onChange={(e) => handleExerciseChange(e, exerciseIndex)}
      >
        {exerciseNamesList.map((name, i) => (
          <option key={i} value={name}>
            {name}
          </option>
        ))}
      </select>
      <label>Sets:</label>
      <input
        className="ats-exercise-parameter-input"
        type="number"
        value={exercises[exerciseIndex].sets.length}
        onChange={(e) => handleSetsNumberChange(e, exerciseIndex)}
      />
      {weight && (
        <>
          <label>1RM</label>
          <input
            className="ats-exercise-parameter-input"
            type="number"
            value={Math.round(weight)}
          />
        </>
      )}
    </div>
  );
};

export default ExerciseHeader;
