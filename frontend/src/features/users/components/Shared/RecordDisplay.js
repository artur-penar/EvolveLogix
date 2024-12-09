import React, { useState } from "react";
import "./RecordDisplay.css";
import RecordsSectionHeader from "./RecordsSectionHeader";
import RecordsSectionLabels from "./RecordsSectionLabels";

const RecordDisplay = ({
  formData,
  isPowerlifts,
  simple,
  isCycleVersion,
  styleClassName,
}) => {
  const initialIndex = Object.fromEntries(
    Object.entries(formData).map(([key, data]) => [key, data.length - 1])
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const justifyContentStyle = isCycleVersion ? "space-evenly" : "space-between";
  const trainingCycleRecordsStyle = isCycleVersion
    ? { height: "110px", overflowY: "auto" }
    : {};

  const handlePrev = (exerciseName) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [exerciseName]: (prevState[exerciseName] || 0) - 1,
    }));
  };

  const handleNext = (exerciseName) => {
    setCurrentIndex((prevState) => ({
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
        {Object.entries(formData).map(([recordIndex, data]) => {
          const currentData = data[currentIndex[recordIndex]];
          return (
            <div
              key={recordIndex}
              className={`record-container ${justifyContentStyle}`}
            >
              <label className="record-content" style={{ textAlign: "left" }}>
                {recordIndex}
              </label>
              <label className="record-content">
                {currentData?.weight || ""}kg
              </label>
              {!isCycleVersion && (
                <label className="record-content">
                  🔺
                  {currentData?.percent_increase !== null
                    ? Math.round(currentData?.percent_increase)
                    : 0 || "0"}
                  %
                </label>
              )}
              {!simple && (
                <label className="record-content">
                  {new Date(currentData.record_date).toLocaleDateString()}
                </label>
              )}

              {!simple && (
                <div className="flex-container">
                  <button
                    onClick={() => handlePrev(recordIndex)}
                    disabled={currentIndex[recordIndex] === 0}
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => handleNext(recordIndex)}
                    disabled={
                      currentIndex[recordIndex] >= initialIndex[recordIndex]
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
