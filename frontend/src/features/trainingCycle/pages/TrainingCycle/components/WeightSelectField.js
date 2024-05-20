import React from "react";

const WeightSelectField = ({
  weeklyExercisePlan,
  handleWeightChange,
  trainingDayIndex,
  exerciseIndex,
  weekIndex,
}) => {
  return (
    <select
      className="input"
      value={
        weeklyExercisePlan[trainingDayIndex]?.exercises[exerciseIndex]?.weeks[
          weekIndex
        ]?.weight || 0
      }
      onChange={(e) => {
        handleWeightChange(
          trainingDayIndex,
          exerciseIndex,
          weekIndex,
          e.target.value
        );
      }}
    >
      {Array.from({ length: 100 }, (_, i) => i + 1).map((weightInPercent) => (
        <option key={weightInPercent} value={weightInPercent}>
          {weightInPercent}%
        </option>
      ))}
    </select>
  );
};

export default WeightSelectField;
