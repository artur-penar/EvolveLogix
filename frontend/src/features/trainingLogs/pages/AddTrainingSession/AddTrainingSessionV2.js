import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import "./AddTrainingSessionV2.css";

const AddTrainingSessionV2 = () => {
  const [comment, setComment] = useState("");
  const [trainingSessionDate, setTrainingSessionDate] = useState("");

  const exercisesData = useSelector((state) => state.exercises.exercises);

  const exerciseNamesList = exercisesData.map((exercise) => exercise.name);

  const [trainingData, setTrainingData] = useState({
    comment: "This is a comment",
    date: "2021-09-01",
    description: "This is a description",
    exercises: [
      {
        exercise: "Squat",
        sets: [
          { set_number: 1, weight: 60, repetitions: 5 },
          { set_number: 2, weight: 80, repetitions: 5 },
          { set_number: 3, weight: 90, repetitions: 5 },
        ],
      },
      {
        exercise: "Bench Press",
        sets: [
          { set_number: 1, weight: 100, repetitions: 5 },
          { set_number: 2, weight: 100, repetitions: 5 },
          { set_number: 3, weight: 100, repetitions: 5 },
        ],
      },
    ],
  });

  const calculateAverageIntensity = (exercise) => {
    const totalWeight = exercise.sets.reduce(
      (totalWeight, set) => totalWeight + set.weight,
      0
    );
    const totalReps = exercise.sets.reduce(
      (totalReps, set) => totalReps + set.repetitions,
      0
    );

    return totalWeight / totalReps;
  };

  const calculateTotalVolume = (exercise) => {
    return exercise.sets.reduce(
      (totalVolume, set) => totalVolume + set.weight * set.repetitions,
      0
    );
  };

  const handleExerciseChange = (e, targetExerciseIndex) => {
    const { name, value } = e.target;
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
        currentExerciseIndex !== targetExerciseIndex
          ? exercise
          : {
              ...exercise,
              [name]: value,
            }
      ),
    });
  };

  const handleExerciseDetailsChange = (
    e,
    targetExerciseIndex,
    targetSetIndex
  ) => {
    const { name, value } = e.target;
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
        currentExerciseIndex !== targetExerciseIndex
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, currentSetIndex) =>
                currentSetIndex !== targetSetIndex
                  ? set
                  : {
                      ...set,
                      [name]: value,
                    }
              ),
            }
      ),
    });
  };

  const updateSets = (exercise, newSetsNumber) => {
    const newSets = [...exercise.sets];

    if (newSetsNumber >= 0)
      if (newSetsNumber < newSets.length) {
        newSets.length = newSetsNumber;
      } else {
        while (newSets.length < newSetsNumber) {
          newSets.push({
            weight: 0,
            repetitions: 0,
            set_number: newSets.length + 1,
          });
        }
      }
    return newSets;
  };

  const handleSetsNumberChange = (e, targetExerciseIndex) => {
    const newSetsNumber = parseInt(e.target.value, 10);
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
        currentExerciseIndex !== targetExerciseIndex
          ? exercise
          : {
              ...exercise,
              sets: updateSets(exercise, newSetsNumber),
            }
      ),
    });
  };

  const handleAddExercise = () => {
    setTrainingData({
      ...trainingData,
      exercises: [
        ...trainingData.exercises,
        {
          exercise: "Squat",
          sets: [{ repetitions: 5, set_number: 1, weight: 100 }],
        },
      ],
    });
  };

  const handleRemoveExercise = (exerciseIndexToRemove) => {
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.filter(
        (exercise, index) => index !== exerciseIndexToRemove
      ),
    });
  };

  // console.log(trainingData[0].exercises[0].setsNumber);

  return (
    <Layout title="EvolveLogix | Training Log">
      <div className="header-container">
        <h1>Add Training Session</h1>
      </div>
      <div className="ats-training-session">
        <div className="ats-training-session-header">
          <h4>Name: {trainingData.description}</h4>
          <label>Date:</label>
          <input type="date" value={trainingSessionDate} />
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {trainingData.exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="ats-exercise">
            <div className="exercise-header">
              <label>Nr.{exerciseIndex + 1} :</label>
              <select
                className="exercise-select"
                name="exercise"
                value={exercise.exercise}
                onChange={(e) => handleExerciseChange(e, exerciseIndex)}
              >
                {exerciseNamesList.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <label>Sets:</label>
              <input
                className="ats-exercise-parameter-input"
                type="number"
                value={trainingData.exercises[exerciseIndex].sets.length}
                onChange={(e) => handleSetsNumberChange(e, exerciseIndex)}
              />
            </div>
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="ats-set">
                <label>Set {set.set_number}:</label>
                <input
                  className="ats-exercise-parameter-input"
                  name="weight"
                  type="number"
                  value={set.weight}
                  onChange={(e) =>
                    handleExerciseDetailsChange(e, exerciseIndex, setIndex)
                  }
                />
                <label>kg x</label>
                <input
                  className="ats-exercise-parameter-input"
                  name="repetitions"
                  type="number"
                  value={set.repetitions}
                  onChange={(e) => {
                    handleExerciseDetailsChange(e, exerciseIndex, setIndex);
                  }}
                />
                <label>reps</label>
              </div>
            ))}
            <p>Exercise volume: {calculateTotalVolume(exercise)}kg</p>
            <button onClick={() => handleRemoveExercise(exerciseIndex)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleAddExercise}>Add exercise</button>
    </Layout>
  );
};

export default AddTrainingSessionV2;
