import React, { useState } from "react";
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
  strengthRecord,
}) => {
  const oneRepMax = strengthRecord;
  const [percentage, setPercentage] = useState(70);

  const handlePercentageChange = (e) => {
    const newPercentage = e.target.value;
    const newWeight = oneRepMax * (newPercentage / 100);
    setPercentage(newPercentage);
    handleChange(
      trainingDayIndex,
      exerciseIndex,
      weekIndex,
      newWeight,
      detailType
    );
  };

  const handlePercentageUpdate = (e) => {
    if (oneRepMax) {
      const newPercentage = Math.round((e.target.value / oneRepMax) * 100);
      console.log("New percentage:", newPercentage);
      setPercentage(newPercentage);
    }
  };

  if (displayWeightInPercent && oneRepMax) {
    return (
      <select
        className="exercise-parameter-input"
        value={percentage}
        onChange={(e) => {
          handlePercentageChange(e);
        }}
        style={{ width: "auto" }}
        isEditable={!isEditable}
      >
        {[...Array(110).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}%
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <input
        className="exercise-parameter-input no-spinner"
        type="number"
        value={value || (isEditable ? "" : 0)}
        onChange={(e) => {
          handleChange(
            trainingDayIndex,
            exerciseIndex,
            weekIndex,
            e.target.value,
            detailType
          );
          handlePercentageUpdate(e);
        }}
        min="0"
        max="400"
        placeholder={detailType}
        disabled={!isEditable}
      />
    );
  }
};

export default ExerciseParameterInput;
