import React from "react";
import "./ExerciseParameterInput.css";

const ExerciseParameterInput = ({
  trainingDayIndex,
  exerciseIndex,
  weekIndex,
  value,
  handleChange,
  detailType,
  displayWeightInPercent,
  isEditable,
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
        isEditable={!isEditable}
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
        className="input no-spinner"
        type="number"
        value={value || (isEditable ? "" : 0)}
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
        disabled={!isEditable}
      />
    );
  }
};

export default ExerciseParameterInput;
