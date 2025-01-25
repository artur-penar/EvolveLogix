import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectExerciseNames } from "features/trainingLogs/selectors";
import { createStrengthRecord } from "features/users/strengthRecordSlice";
import ContainerHeader from "shared/components/ContainerHeader";
import Button from "@mui/material/Button";
import "./NewStrengthRecord.css";

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
    <div className="new-strength-record-container">
      <ContainerHeader headerContent="New Strength Record" />

      <div className="new-strength-record-form">
        <div className="nsr-form-container">
          <div className="nsr-row">
            <label htmlFor="exercise">Exercise</label>
            <select
              className="nsr-centered-input form-control"
              id="exercise"
              name="exercise"
              value={exerciseName}
              onChange={handleExerciseChange}
            >
              {exercisesList.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>
          <div className="nsr-row">
            <label htmlFor="weight">Weight</label>
            <input
              className="nsr-centered-input form-control"
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={handleWeightChange}
            />
          </div>
          <div className="nsr-row">
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "green",
                borderColor: "green",
                "&:hover": {
                  backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
                  borderColor: "green",
                },
              }}
              className="user-details-button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStrengthRecord;
