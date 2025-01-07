import React from "react";
import StrengthRecordsSectionHeader from "./StrengthRecordsSectionHeader";
import StrengthRecordsSectionLabels from "./StrengthRecordsSectionLabels";
import StrengthRecordRow from "./StrengthRecordRow";
import useRecordIndices from "./useRecordIndices";
import "./StrengthRecordsDisplay.css";

const StrengthRecordsDisplay = ({
  formData: exerciseRecords,
  isPowerlifts,
  isSimpleView,
  isCycleVersion,
  styleClassName,
}) => {
  const { initialRecordIndices, currentRecordIndices, handlePrev, handleNext } =
    useRecordIndices(exerciseRecords);
  const justifyContentStyle = isCycleVersion ? "space-evenly" : "space-between";
  const trainingCycleRecordsStyle = {
    height: isCycleVersion ? "110px" : "auto",
    overflowY: isCycleVersion ? "auto" : "visible",
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
      <div
        className="strength-records-list"
        style={trainingCycleRecordsStyle}
      >
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
