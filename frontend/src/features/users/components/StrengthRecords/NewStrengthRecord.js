import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectExerciseNames } from "features/trainingLogs/exercises";
import { createStrengthRecord } from "features/users/strengthRecordSlice";

const NewStrengthRecord = () => {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const exercisesList = useSelector(selectExerciseNames);
  const [exerciseName, setExerciseName] = useState(exercisesList[0]);
  const [weight, setWeight] = useState(0);

  const handleExerciseChange = (e) => {
    setExerciseName(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSubmit = (e) => {
    const date = new Date();
    const dateString = date.toISOString().split("T")[0];
    const exerciseObject = exercises.find((ex) => ex.name === exerciseName);
    if (exerciseObject) {
      dispatch(
        createStrengthRecord({
          record_date: dateString,
          exercise: exerciseName,
          weight: weight,
        })
      );
    } else {
      console.error("No exercise found with name: ", exerciseName);
    }
  };

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
          <select
            className="form-control"
            value={exerciseName}
            onChange={handleExerciseChange}
            style={{ width: "60%" }}
          >
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
            value={weight}
            onChange={handleWeightChange}
            style={{ width: "60%" }}
          ></input>
        </div>
      </div>
      <button
        onClick={handleSubmit}
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
