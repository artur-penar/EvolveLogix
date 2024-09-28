import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import "./AddTrainingSessionV2.css";

const AddTrainingSessionV2 = () => {
  const loading = useSelector((state) => state.log.loading);
  const [comment, setComment] = useState("");
  const [trainingSessionDate, setTrainingSessionDate] = useState("");

  const [trainingData, setTrainingData] = useState({
    comment: "This is a comment",
    date: "2021-09-01",
    description: "This is a description",
    exercises: [
      {
        exercise: "Squat",
        sets: [
          { set_number: 1, weight: 100, repetitions: 5 },
          { set_number: 2, weight: 100, repetitions: 5 },
          { set_number: 3, weight: 100, repetitions: 5 },
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

  console.log("trainingData", trainingData);

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
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="header-container">
            <h1>Add Training Session</h1>
          </div>
          <div className="training-session">
            <h4>Name: {trainingData.description}</h4>
            <label>Date:</label>
            <input type="date" value={trainingSessionDate} />
            <label>Comment:</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {trainingData.exercises.map(
              (exercise, exerciseIndex) => (
                console.log("exercise", exercise),
                (
                  <div key={exerciseIndex} className="ex">
                    <p>
                      Nr.{exerciseIndex + 1} : {exercise.exercise}
                    </p>
                    <label>Sets:</label>
                    <input
                      type="number"
                      value={trainingData.exercises[exerciseIndex].sets.length}
                      onChange={(e) => handleSetsNumberChange(e, exerciseIndex)}
                    />
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="set">
                        <p>
                          Set {set.set_number}: {set.weight}kg x{" "}
                          {set.repetitions}rep
                        </p>
                      </div>
                    ))}
                    <button onClick={() => handleRemoveExercise(exerciseIndex)}>
                      Remove
                    </button>
                  </div>
                )
              )
            )}
          </div>
          <button onClick={handleAddExercise}>Add exercise</button>
        </>
      )}
    </Layout>
  );
};

export default AddTrainingSessionV2;
