import React, { useState } from "react";
import "./RecordDisplay.css";

const RecordDisplay = ({ formData, isPowerlifts, simple, styleClassName }) => {
  const initialIndex = Object.fromEntries(
    Object.entries(formData).map(([key, data]) => [key, data.length - 1])
  );

  console.log("formData");
  console.log(formData);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

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
      {!simple && (
        <h4 className="header-container">
          {isPowerlifts ? "Powerlifts" : "Others"}
        </h4>
      )}
      <div
        style={{
          display: "flex",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
          marginBottom: "10px",
          alignItems: "center",
          padding: "5px",
        }}
      >
        {simple && <h5>{isPowerlifts ? "Powerlifts" : "Others"}</h5>}
      </div>
      <div className="record-container">
        <label className="record-label" style={{ textAlign: "left" }}>
          Exercise:
        </label>
        <label className="record-label">Weight:</label>
        <label className="record-label">Increase:</label>
        {!simple && <label className="record-label">Record Date:</label>}
        {!simple && <label className="record-label">Prev/Next:</label>}
      </div>
      {Object.entries(formData).map(([recordIndex, data]) => (
        <div key={recordIndex} className="record-container">
          <label className="record-content" style={{ textAlign: "left" }}>
            {recordIndex}
          </label>
          <label className="record-content">
            {data[currentIndex[recordIndex]].weight}kg
          </label>
          <label className="record-content">
            🔺
            {data[currentIndex[recordIndex]].percent_increase !== null
              ? data[currentIndex[recordIndex]].percent_increase
              : 0}
            %
          </label>
          {!simple && (
            <label className="record-content">
              {new Date(
                data[currentIndex[recordIndex]].record_date
              ).toLocaleDateString()}
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
      ))}
    </div>
  );
};

export default RecordDisplay;
