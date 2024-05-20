import React from "react";

const ExerciseParameterInput = ({
  trainingDayIndex,
  exerciseIndex,
  weekIndex,
  value,
  handleChange,
  detailType,
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
            e.target.value,
            detailType
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
        value={value || null}
        onChange={(e) =>
          handleChange(
            trainingDayIndex,
            exerciseIndex,
            weekIndex,
            e.target.value,
            detailType
          )
        }
        placeholder={detailType}
      />
    );
  }
};

export default ExerciseParameterInput;
