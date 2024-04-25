import React from "react";

const ExerciseParameterInput = ({
  trainingDayIndex,
  exerciseIndex,
  weekIndex,
  value,
  handleChange,
  placeholder,
  displayWeightInPercent,
}) => {
  if (displayWeightInPercent) {
    return (
      <select
        className="input"
        value={value || 0}
        onChange={(e) =>
          handleChange(
            trainingDayIndex,
            exerciseIndex,
            weekIndex,
            e.target.value
          )
        }
        style={{ width: "auto" }}
      >
        {[...Array(100).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}%
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <input
        className="input"
        type="text"
        value={value || 0}
        onChange={(e) =>
          handleChange(
            trainingDayIndex,
            exerciseIndex,
            weekIndex,
            e.target.value
          )
        }
        placeholder={placeholder}
      />
    );
  }
};

export default ExerciseParameterInput;
