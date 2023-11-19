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
              <div className="form-group">
                <label className="form-label" htmlFor={`weight${setIndex}`}>
                  Weight:
                  <input
                    className="form-control"
                    type="number"
                    name="weight"
                    value={exercise.sets[setIndex]?.weight || ""}
                    onChange={(e) => handleExerciseChange(e, index, setIndex)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`repetitions${setIndex}`}
                >
                  Repetitions:
                  <input
                    className="form-control"
                    type="number"
                    name="repetitions"
                    value={exercise.sets[setIndex]?.repetitions || ""}
                    onChange={(e) => handleExerciseChange(e, index, setIndex)}
                  />
                </label>
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SetField;
