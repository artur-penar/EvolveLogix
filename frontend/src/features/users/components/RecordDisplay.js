import { useState } from "react";

const RecordDisplay = ({ formData, handleEdit, simple }) => {
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
    <div className="body-measurements">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <label style={{ width: "20%" }}>Exercise:</label>
        <label style={{ width: "20%" }}>Weight:</label>
        {!simple && <label style={{ width: "20%" }}>Record Date:</label>}
        {!simple && <label>Prev/Next:</label>}
      </div>
      {Object.entries(formData).map(([key, data]) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <label style={{ width: "20%" }}>{key}</label>
          <input
            className="centered-input"
            type="number"
            name={key}
            value={data[currentIndex[key]].weight}
            style={{ width: "20%" }}
            disabled
            min="0"
          />
          {!simple && (
            <input
              className="centered-input"
              type="text"
              name={`${key}_date`}
              value={new Date(
                data[currentIndex[key]].record_date
              ).toLocaleDateString()}
              disabled
            />
          )}
          {!simple && (
            <div style={{ display: "flex" }}>
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
      {!simple && (
        <button className="dashboard-button" onClick={handleEdit}>
          Edit
        </button>
      )}
      {simple && (
        <button className="dashboard-button" onClick={handleEdit}>
          Go To
        </button>
      )}
    </div>
  );
};

export default RecordDisplay;
