import React from "react";
import "./SetField.css";

const SetField = ({ exercise, index, handleExerciseChange, setsNumber }) => {
  return (
    <div className="set-field">
      {Array.from({ length: setsNumber }).map((_, setIndex) => (
        <div key={setIndex}>
          <div className="form-group set-input">
            <label className="form-label" htmlFor={`set${setIndex}`}>
              Set: {setIndex + 1}
            </label>
            <div className="form-group">
              <label className="form-label" htmlFor={`weight${setIndex}`}>
                Weight:
              </label>
              <input
                className="form-control"
                type="number"
                min="1"
                name="weight"
                value={exercise.sets[setIndex]?.weight || ""}
                onChange={(e) => handleExerciseChange(e, index, setIndex)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`repetitions${setIndex}`}>
                Repetitions:
              </label>
              <input
                className="form-control"
                type="number"
                min="1"
                name="repetitions"
                value={exercise.sets[setIndex]?.repetitions || ""}
                onChange={(e) => handleExerciseChange(e, index, setIndex)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SetField;