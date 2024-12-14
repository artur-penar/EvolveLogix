import React, { useState } from "react";
import "./RecordDisplay.css";
import RecordsSectionHeader from "./RecordsSectionHeader";
import RecordsSectionLabels from "./RecordsSectionLabels";
import RecordRow from "./RecordRow";

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
          const recordRowProps = {
            exerciseName,
            currentRecord,
            isCycleVersion,
            simple,
            handlePrev,
            handleNext,
            currentRecordIndices,
            initialRecordIndices,
            justifyContentStyle,
          };
          return <RecordRow key={exerciseName} {...recordRowProps} />;
        })}
      </div>
    </div>
  );
};

export default RecordDisplay;
