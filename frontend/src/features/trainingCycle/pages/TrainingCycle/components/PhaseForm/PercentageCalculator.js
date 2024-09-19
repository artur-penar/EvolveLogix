import React, { useEffect, useMemo, useState } from "react";
import { getLatestStrengthRecords } from "features/trainingCycle/utils/getLatestStrengthRecords";
import "./PercentageCalculator.css";
import useUpdateStrengthRecords from "features/trainingCycle/hooks/PercentageCalculator/useUpdateStrengthRecords";
import useGetLatestRecords from "features/trainingCycle/hooks/PercentageCalculator/useGetLatestStrengthRecords";
import useConvertValue from "features/trainingCycle/hooks/PercentageCalculator/useConvertValue";

const PercentageCalculator = ({ strengthRecords }) => {
  const [selectedExerciseName, setSelectedExerciseName] = useState("Other");
  const [percentageValue, setPercentageValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [otherWeight, setOtherWeight] = useState(0);

  // Update the strength records to include an "Other" exercise
  // Include "Other" allows the user to input their own weight
  const updatedStrengthRecords = useUpdateStrengthRecords(strengthRecords);
  const latestStrengthRecords = useGetLatestRecords(updatedStrengthRecords);

  // Get the latest record for the selected exercise
  const selectedExerciseRecord = latestStrengthRecords[
    selectedExerciseName
  ]?.[0] || {
    weight: 0,
  };
  useConvertValue({
    selectedExerciseName,
    selectedExerciseRecord,
    percentageValue,
    otherWeight,
    setConvertedValue,
  });

  const handleOneRepMaxChange = (e) => {
    setOtherWeight(e.target.value);
  };

  const handleChange = (e) => {
    setSelectedExerciseName(e.target.value);
  };

  const handlePercentChange = (e) => {
    setPercentageValue(e.target.value);
  };

  return (
    <div className="calculator-container">
      <div className="simple-header-container">
        <h5>Calculator</h5>
      </div>
      <div className="calculator-body">
        <select
          className="calculator-select"
          value={selectedExerciseName}
          onChange={handleChange}
        >
          {Object.keys(latestStrengthRecords).map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
        <label className="calculator-label">1RM:</label>
        <input
          className={
            selectedExerciseName === "Other"
              ? "calculator-input"
              : "calculator-input no-spinner"
          }
          type="number"
          disabled={selectedExerciseName !== "Other"}
          value={
            selectedExerciseName === "Other"
              ? otherWeight
              : parseFloat(selectedExerciseRecord.weight).toFixed(1)
          }
          onChange={handleOneRepMaxChange}
        />
        <label className="calculator-label">kg x</label>
        <input
          className="calculator-input"
          type="number"
          value={percentageValue}
          onChange={handlePercentChange}
        />
        <label className="calculator-label">% =</label>
        <input
          className="calculator-input no-spinner"
          type="number"
          disabled
          value={convertedValue}
        />
        <label className="calculator-label">kg</label>
      </div>
    </div>
  );
};

export default PercentageCalculator;
