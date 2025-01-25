import React from "react";
import Button from "@mui/material/Button";

/**
 * RecordNavigation component for navigating through exercise records.
 *
 * @param {Object} props - The component props.
 * @param {string} props.exerciseName - The name of the exercise.
 * @param {Function} props.handleNext - Function to handle the next record action.
 * @param {Function} props.handlePrev - Function to handle the previous record action.
 * @param {Object} props.currentRecordIndices - Object containing the current indices of records for each exercise.
 * @param {Object} props.initialRecordIndices - Object containing the initial indices of records for each exercise.
 * @returns {JSX.Element} The RecordNavigation component.
 */
const RecordNavigation = ({
  exerciseName,
  handleNext,
  handlePrev,
  currentRecordIndices,
  initialRecordIndices,
}) => {
  return (
    <div className="flex-container">
      <Button
        variant="outlined"
        size="small"
        sx={{
          color: "green",
          borderColor: "green",
          "&:hover": {
            backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
            borderColor: "green",
          },
        }}
        onClick={() => handlePrev(exerciseName)}
        disabled={currentRecordIndices[exerciseName] === 0}
      >
        &lt;
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{
          color: "green",
          borderColor: "green",
          "&:hover": {
            backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
            borderColor: "green",
          },
        }}
        onClick={() => handleNext(exerciseName)}
        disabled={
          currentRecordIndices[exerciseName] >=
          initialRecordIndices[exerciseName]
        }
      >
        &gt;
      </Button>
    </div>
  );
};

export default RecordNavigation;
