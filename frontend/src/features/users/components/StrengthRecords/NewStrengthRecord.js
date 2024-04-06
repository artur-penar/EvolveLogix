import React from "react";
import { useSelector } from "react-redux";
import { selectExerciseNames } from "features/trainingLogs/exercises";

const NewStrengthRecord = () => {
  const exercisesList = useSelector(selectExerciseNames);

  return (
    <div
      className="strength-records-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h4 className="header-container">Add new record</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <p>Exercise:</p>
          <select className="form-control" style={{ width: "60%" }}>
            {exercisesList.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <p>Weight:</p>
          <input
            type="number"
            step="0.25"
            min="0"
            style={{ width: "60%" }}
          ></input>
        </div>
      </div>
      <button
        style={{
          display: "block",
          margin: "0 auto",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default NewStrengthRecord;
