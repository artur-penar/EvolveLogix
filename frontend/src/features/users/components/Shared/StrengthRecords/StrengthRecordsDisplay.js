import React, { useState } from "react";
import StrengthRecordsSectionHeader from "./StrengthRecordsSectionHeader";
import StrengthRecordsSectionLabels from "./StrengthRecordsSectionLabels";
import StrengthRecordRow from "./StrengthRecordRow";
import "./StrengthRecordsDisplay.css";

const StrengthRecordsDisplay = ({
  formData: exerciseRecords,
  isPowerlifts,
  isSimpleView,
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
      <StrengthRecordsSectionHeader
        isSimpleView={isSimpleView}
        isPowerlifts={isPowerlifts}
      />
      <StrengthRecordsSectionLabels
        isSimpleView={isSimpleView}
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
            isSimpleView,
            handlePrev,
            handleNext,
            currentRecordIndices,
            initialRecordIndices,
            justifyContentStyle,
          };
          return <StrengthRecordRow key={exerciseName} {...recordRowProps} />;
        })}
      </div>
    </div>
  );
};

export default StrengthRecordsDisplay;
