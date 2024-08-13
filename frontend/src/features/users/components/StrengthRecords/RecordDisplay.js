import React, { useState } from "react";
import "./RecordDisplay.css";

const RecordDisplay = ({
  formData,
  isPowerlifts,
  simple,
  isCycleVersion,
  styleClassName,
}) => {
  console.log("formData", formData);
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

  if (formData.length === 0) {
    return null;
  }

  return (
    <div className={styleClassName}>
      {!simple && (
        <h4 className="header-container">
          {isPowerlifts ? "Powerlifts" : "Others"}
        </h4>
      )}
      <div className="simple-header-container">
        {simple && <h5>{isPowerlifts ? "Powerlifts" : "Others"}</h5>}
      </div>
      <div
        className="record-container"
        style={{ justifyContent: justifyContentStyle }}
      >
        <label className="record-label" style={{ textAlign: "left" }}>
          Exercise:
        </label>
        <label className="record-label">Weight:</label>
        {!isCycleVersion && <label className="record-label">Increase:</label>}
        {!simple && <label className="record-label">Record Date:</label>}
        {!simple && <label className="record-label">Prev/Next:</label>}
      </div>
      <div style={trainingCycleRecordsStyle}>
        {Object.entries(formData).map(([recordIndex, data]) => {
          const currentData = data[currentIndex[recordIndex]];
          return (
            <div
              key={recordIndex}
              className="record-container"
              style={{ justifyContent: justifyContentStyle }}
            >
              <label className="record-content" style={{ textAlign: "left" }}>
                {recordIndex}
              </label>
              <label className="record-content">{currentData.weight}kg</label>
              {!isCycleVersion && (
                <label className="record-content">
                  🔺
                  {currentData.percent_increase !== null
                    ? currentData.percent_increase
                    : 0}
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
