import React, { useEffect, useMemo, useState } from "react";
import { getLatestStrengthRecords } from "features/trainingCycle/utils/getLatestStrengthRecords";
import "./PercentageCalculator.css";
import useUpdateStrengthRecords from "features/trainingCycle/hooks/PercentageCalculator/useUpdateStrengthRecords";
import useGetLatestRecords from "features/trainingCycle/hooks/PercentageCalculator/useGetLatestStrengthRecords";

const PercentageCalculator = ({ strengthRecords }) => {
  const [selectedExercise, setSelectedExercise] = useState("Other");
  const [percentageValue, setPercentageValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [otherWeight, setOtherWeight] = useState(0);

  // Update the strength records to include an "Other" exercise
  // Include "Other" allows the user to input their own weight
  const updatedStrengthRecords = useUpdateStrengthRecords(strengthRecords);
  const latestStrengthRecords = useGetLatestRecords(updatedStrengthRecords);

  // Get the latest record for the selected exercise
  const selectedExerciseData = latestStrengthRecords[selectedExercise]?.[0] || {
    weight: 0,
  };

  // Calculate the converted value when the percentage value changes
  useEffect(() => {
    // Use Effect to calculate the converted value
    const selectedExerciseData = latestStrengthRecords[selectedExercise]?.[0];

    // If the selected exercise is "Other", use the otherWeight value
    if (selectedExercise === "Other") {
      setConvertedValue(Math.round((otherWeight * percentageValue) / 100));
      // If the selected exercise is not "Other" and the selected exercise has a weight value
      // Calculate the converted value based on the selected exercise weight
    } else if (selectedExerciseData.weight && percentageValue) {
      setConvertedValue(
        Math.round((selectedExerciseData.weight * percentageValue) / 100)
      );
    }
  }, [selectedExercise, percentageValue, otherWeight]);

  const handleOneRepMaxChange = (e) => {
    setOtherWeight(e.target.value);
  };

  const handleChange = (e) => {
    setSelectedExercise(e.target.value);
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
          value={selectedExercise}
          onChange={handleChange}
        >
          {Object.keys(getLatestStrengthRecords(updatedStrengthRecords)).map(
            (exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            )
          )}
        </select>
        <label className="calculator-label">1RM:</label>
        <input
          className={
            selectedExercise === "Other"
              ? "calculator-input"
              : "calculator-input no-spinner"
          }
          type="number"
          disabled={selectedExercise !== "Other"}
          value={
            selectedExercise === "Other"
              ? otherWeight
              : parseFloat(selectedExerciseData.weight).toFixed(1)
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
