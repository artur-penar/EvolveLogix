import React from "react";

const ExerciseTable = ({
  exercise,
  strengthRecords,
  exerciseName,
  exerciseIndex,
  handleWeightPercentageChange,
  handleExerciseDetailsChange,
}) => {
  const { weight: oneRepMax } = strengthRecords[exerciseName] || {};
  return (
    <div className="exercise-table-container">
      <div className="exercise-table">
        <div className="exercise-table-header">
          <label>Set</label>
          {oneRepMax && <label>Percent</label>}
          <label>Weight</label>
          <label>Reps</label>
        </div>
        {exercise.sets.map((set, setIndex) => (
          <div key={setIndex} className="exercise-table-row">
            <label>&nbsp;&nbsp;&nbsp;{setIndex + 1}</label>
            {oneRepMax && (
              <input
                className="ats-exercise-parameter-input"
                type="number"
                value={Math.round((set.weight / oneRepMax) * 100)}
                onChange={(e) =>
                  handleWeightPercentageChange(
                    e.target.value,
                    strengthRecords[exerciseName]?.weight,
                    exerciseIndex,
                    setIndex
                  )
                }
              />
            )}
            <input
              className="ats-exercise-parameter-input"
              name="weight"
              type="number"
              value={set.weight}
              onChange={(e) =>
                handleExerciseDetailsChange(e, exerciseIndex, setIndex)
              }
            />
            <input
              className="ats-exercise-parameter-input"
              name="repetitions"
              type="number"
              value={set.repetitions}
              onChange={(e) => {
                handleExerciseDetailsChange(e, exerciseIndex, setIndex);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseTable;
