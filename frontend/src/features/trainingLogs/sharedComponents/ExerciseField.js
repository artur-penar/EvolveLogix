import React from "react";
import SetField from "./SetField";
import "./ExerciseField.css";

const ExerciseField = ({
  exercises,
  exerciseNameList,
  handleExerciseChange,
  handleRemoveExercise,
  handleSetsNumberChange,
}) => {
  return (
    <div>
      {exercises.map((exercise, index) => (
        <div className="exercise" key={index}>
          <div className="exercise-set-container">
            <div className="exercise-left-panel">
              <label className="form-label" htmlFor={`exercise${index}`}>
                Exercise: {index + 1}
              </label>
              <div className="form-group">
                <label className="form-label" htmlFor={`exercise${index}`}>
                  Name:
                </label>
                <select
                  className="form-control"
                  name="exercise"
                  value={exercise.exercise}
                  onChange={(e) => handleExerciseChange(e, index)}
                >
                  {exerciseNameList.map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <div className="form-group">
                  <label className="form-label" htmlFor={`sets${index}`}>
                    Sets
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    min="1"
                    name="setsNumber"
                    value={exercise.setsNumber || ""}
                    onChange={(e) => handleSetsNumberChange(e, index)}
                  />
                </div>
              </div>
            </div>
            <div className="exercise-right-panel">
              <SetField
                exercise={exercise}
                index={index}
                setsNumber={exercise.setsNumber}
                handleExerciseChange={handleExerciseChange}
                handleSetsNumberChange={handleSetsNumberChange}
              />
            </div>
          </div>
          <div className="delete-button-container">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleRemoveExercise(index)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseField;
