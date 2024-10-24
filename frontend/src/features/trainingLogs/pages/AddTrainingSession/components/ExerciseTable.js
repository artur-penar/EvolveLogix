import React from "react";

const ExerciseTable = ({
  exercise,
  strengthRecords,
  exerciseName,
  exerciseIndex,
  handleCheckboxChange,
  handleWeightPercentageChange,
  handleExerciseDetailsChange,
}) => {
  const { weight: oneRepMax } = strengthRecords[exerciseName] || {};
  const stylingClass = oneRepMax
    ? "ats-exercise-table ats-five-columns"
    : "ats-exercise-table ats-four-columns";

  console.log("exercise", exercise);

  return (
    <div className="ats-exercise-table-container">
      <div className={stylingClass}>
        <div className="ats-exercise-table-header">
          <label>Set</label>
          {oneRepMax && <label>Percent</label>}
          <label>Weight</label>
          <label>Reps</label>
          <label>Completed</label>
        </div>
        {exercise.sets.map((set, setIndex) => (
          <div key={setIndex} className="ats-exercise-table-row">
            <label>&nbsp;&nbsp;&nbsp;{setIndex + 1}</label>

            {oneRepMax && (
              <input
                className="ats-exercise-parameter-input"
                type="number"
                value={Math.round((set.weight / oneRepMax) * 100)}
                min={0}
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
              className="ats-exercise-parameter-input weight"
              name="weight"
              type="number"
              value={set.weight}
              min={0}
              onChange={(e) =>
                handleExerciseDetailsChange(e, exerciseIndex, setIndex)
              }
            />
            <input
              className="ats-exercise-parameter-input"
              name="repetitions"
              type="number"
              value={set.repetitions}
              min={0}
              onChange={(e) => {
                handleExerciseDetailsChange(e, exerciseIndex, setIndex);
              }}
            />
            <div className="ats-checkbox-container">
              <input
                id={`checkbox-${exerciseIndex}-${setIndex}`}
                className="ats-custom-checkbox"
                type="checkbox"
                checked={set.is_completed || false}
                onChange={(e) =>
                  handleCheckboxChange(e, exerciseIndex, setIndex)
                } // Add an onChange handler if needed
              />
              <label
                htmlFor={`checkbox-${exerciseIndex}-${setIndex}`}
                className="ats-custom-checkbox-label"
              ></label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseTable;
