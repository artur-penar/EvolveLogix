import React from "react";
import SetField from "./SetField";

const ExerciseField = ({
  exercises,
  exerciseNameList,
  handleExerciseChange,
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
                <div className="form-group">
                  <label className="form-label" htmlFor={`exercise${index}`}>
                    Name:
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
                    <div className="form-group" >
                      <label className="form-label" htmlFor={`sets${index}`}>
                        Sets
                        <input
                          className="form-control"
                          type="number"
                          min="1"
                          name="setsNumber"
                          value={exercise.setsNumber || 1}
                          onChange={(e) => handleSetsNumberChange(e, index)}
                        />
                      </label>
                    </div>
                  </label>
                </div>
              </label>
            </div>

            <SetField
              exercise={exercise}
              index={index}
              setsNumber={exercise.setsNumber}
              handleExerciseChange={handleExerciseChange}
              handleSetsNumberChange={handleSetsNumberChange}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseField;
