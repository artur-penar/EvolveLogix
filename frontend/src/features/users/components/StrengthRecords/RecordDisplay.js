import React, { useState } from "react";
import "./RecordDisplay.css";

const RecordDisplay = ({
  formData,
  isPowerlifts,
  handleEdit,
  simple,
  styleClassName,
}) => {
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
      <div className="record-container">
        <label className="record-label">Exercise:</label>
        <label className="record-label">Weight:</label>
        <label className="record-label">Increase:</label>
        {!simple && <label className="record-label">Record Date:</label>}
        {!simple && <label className="record-label">Prev/Next:</label>}
      </div>
      {Object.entries(formData).map(([key, data]) => (
        <div key={key} className="record-container">
          <label className="record-content">{key}</label>
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
          {/* <input
            className="centered-input"
            type="number"
            name={key}
            value={data[currentIndex[key]].weight}
            disabled
            min="0"
          /> */}
          {/* {!simple && (
            <input
              className="centered-input"
              type="text"
              name={`${key}_date`}
              value={new Date(
                data[currentIndex[key]].record_date
              ).toLocaleDateString()}
              disabled
            />
          )} */}
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
      {/* {!simple && (
        <button className="dashboard-button" onClick={handleEdit}>
          Update
        </button>
      )} */}
    </div>
  );
};

export default RecordDisplay;
