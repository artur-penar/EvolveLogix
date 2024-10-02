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
    <div className="ats-exercise-header">
      <div className="ats-exercise-header-row">
        <label>Nr.{exerciseIndex + 1} :</label>
        <select
          className="ats-exercise-select"
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
      </div>
      <div className="ats-exercise-header-row">
        <label>Sets:</label>
        <input
          className="ats-exercise-parameter-input"
          type="number"
          value={exercises[exerciseIndex].sets.length}
          onChange={(e) => handleSetsNumberChange(e, exerciseIndex)}
        />
      </div>
      {weight && (
        <div className="ats-exercise-header-row">
          <label>1RM:</label>
          <input
            className="ats-exercise-parameter-input no-spinner"
            type="number"
            value={Math.round(weight)}
            disabled={true}
          />
        </div>
      )}
    </div>
  );
};

export default ExerciseHeader;
