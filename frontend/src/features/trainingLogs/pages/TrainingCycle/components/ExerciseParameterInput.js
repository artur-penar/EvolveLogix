import React from "react";

const ExerciseParameterInput = ({
  trainingDayIndex,
  exerciseIndex,
  weekIndex,
  value,
  handleChange,
  placeholder,
}) => (
  <input
    className="input"
    type="text"
    value={value || 0}
    onChange={(e) =>
      handleChange(trainingDayIndex, exerciseIndex, weekIndex, e.target.value)
    }
    placeholder={placeholder}
  />
);
export default ExerciseParameterInput;
