import React, { useState } from "react";
import "./RecordDisplay.css";

const RecordDisplay = ({ formData, isPowerlifts, simple, styleClassName }) => {
  const initialIndex = Object.fromEntries(
    Object.entries(formData).map(([key, data]) => [key, data.length - 1])
  );

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
        <h5>{simple && isPowerlifts ? "Powerlifts" : "Others"}</h5>
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
      {Object.entries(formData).map(([key, data]) => (
        <div key={key} className="record-container">
          <label className="record-content" style={{ textAlign: "left" }}>
            {key}
          </label>
          <label className="record-content">
            {data[currentIndex[key]].weight}kg
          </label>
          <label className="record-content">
            🔺
            {data[currentIndex[key]].percent_increase !== null
              ? data[currentIndex[key]].percent_increase
              : 0}
            %
          </label>
          {!simple && (
            <label className="record-content">
              {new Date(
                data[currentIndex[key]].record_date
              ).toLocaleDateString()}
            </label>
          )}

          {!simple && (
            <div className="flex-container">
              <button
                onClick={() => handlePrev(key)}
                disabled={currentIndex[key] === 0}
              >
                &lt;
              </button>
              <button
                onClick={() => handleNext(key)}
                disabled={currentIndex[key] >= initialIndex[key]}
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
