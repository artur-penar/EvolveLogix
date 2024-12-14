import React from "react";

/**
 * RecordRow component displays a row of exercise records with various details.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.exerciseName - The name of the exercise.
 * @param {Object} props.currentRecord - The current record object containing details like weight and date.
 * @param {boolean} props.isCycleVersion - Flag to determine if the cycle version is being used.
 * @param {boolean} props.simple - Flag to determine if the simple version is being used.
 * @param {Function} props.handleNext - Function to handle the next record action.
 * @param {Function} props.handlePrev - Function to handle the previous record action.
 * @param {Object} props.currentRecordIndices - Object containing the current indices of records.
 * @param {Object} props.initialRecordIndices - Object containing the initial indices of records.
 * @param {string} props.justifyContentStyle - CSS class for justify content style.
 *
 * @returns {JSX.Element} The RecordRow component.
 */
const StrengthRecordRow = ({
  exerciseName,
  currentRecord,
  isCycleVersion,
  isSimpleView,
  handleNext,
  handlePrev,
  currentRecordIndices,
  initialRecordIndices,
  justifyContentStyle,
}) => {
  return (
    <div
      key={exerciseName}
      className={`record-container ${justifyContentStyle}`}
    >
      <label className="record-content" style={{ textAlign: "left" }}>
        {exerciseName}
      </label>
      <label className="record-content">{currentRecord?.weight || ""}kg</label>
      {!isCycleVersion && (
        <label className="record-content">
          🔺
          {currentRecord?.percent_increase !== null
            ? Math.round(currentRecord?.percent_increase)
            : 0 || "0"}
          %
        </label>
      )}
      {!isSimpleView && (
        <label className="record-content">
          {new Date(currentRecord.record_date).toLocaleDateString()}
        </label>
      )}

      {!isSimpleView && (
        <div className="flex-container">
          <button
            onClick={() => handlePrev(exerciseName)}
            disabled={currentRecordIndices[exerciseName] === 0}
          >
            &lt;
          </button>
          <button
            onClick={() => handleNext(exerciseName)}
            disabled={
              currentRecordIndices[exerciseName] >=
              initialRecordIndices[exerciseName]
            }
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default StrengthRecordRow;
