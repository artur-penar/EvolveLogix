import React, { useState } from "react";
import "./RecordDisplay.css";
import RecordsSectionHeader from "./RecordsSectionHeader";
import RecordsSectionLabels from "./RecordsSectionLabels";

const RecordDisplay = ({
  formData: exerciseRecords,
  isPowerlifts,
  simple,
  isCycleVersion,
  styleClassName,
}) => {
  const initialRecordIndices = Object.fromEntries(
    Object.entries(exerciseRecords).map(([key, data]) => [key, data.length - 1])
  );

  const [currentRecordIndices, setCurrentRecordIndices] =
    useState(initialRecordIndices);
  const justifyContentStyle = isCycleVersion ? "space-evenly" : "space-between";
  const trainingCycleRecordsStyle = isCycleVersion
    ? { height: "110px", overflowY: "auto" }
    : {};

  const handlePrev = (exerciseName) => {
    setCurrentRecordIndices((prevState) => ({
      ...prevState,
      [exerciseName]: (prevState[exerciseName] || 0) - 1,
    }));
  };

  const handleNext = (exerciseName) => {
    setCurrentRecordIndices((prevState) => ({
      ...prevState,
      [exerciseName]: (prevState[exerciseName] || 0) + 1,
    }));
  };

  return (
    <div className={styleClassName}>
      <RecordsSectionHeader simple={simple} isPowerlifts={isPowerlifts} />
      <RecordsSectionLabels
        simple={simple}
        isCycleVersion={isCycleVersion}
        justifyContentStyle={justifyContentStyle}
      />
      <div style={trainingCycleRecordsStyle}>
        {Object.entries(exerciseRecords).map(([exerciseName, records]) => {
          const currentRecord = records[currentRecordIndices[exerciseName]];
          return (
            <div
              key={exerciseName}
              className={`record-container ${justifyContentStyle}`}
            >
              <label className="record-content" style={{ textAlign: "left" }}>
                {exerciseName}
              </label>
              <label className="record-content">
                {currentRecord?.weight || ""}kg
              </label>
              {!isCycleVersion && (
                <label className="record-content">
                  🔺
                  {currentRecord?.percent_increase !== null
                    ? Math.round(currentRecord?.percent_increase)
                    : 0 || "0"}
                  %
                </label>
              )}
              {!simple && (
                <label className="record-content">
                  {new Date(currentRecord.record_date).toLocaleDateString()}
                </label>
              )}

              {!simple && (
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
        })}
      </div>
    </div>
  );
};

export default RecordDisplay;
