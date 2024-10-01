import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import useFetchStrengthRecords from "features/trainingCycle/hooks/PhaseForm/useFetchStrengthRecords";
import useGetLatestRecords from "features/trainingCycle/hooks/PercentageCalculator/useGetLatestStrengthRecords";
import "./AddTrainingSessionV2.css";
import TrainingSession from "features/trainingCycle/pages/TrainingCycle/components/Shared/TrainingSession/TrainingSession";
import TrainingSessionHeader from "./components/TrainingSessionHeader";

const AddTrainingSessionV2 = () => {
  const [comment, setComment] = useState("");
  const [trainingSessionDate, setTrainingSessionDate] = useState("");

  const strengthRecords = useFetchStrengthRecords();
  const latestStrengthRecords = useGetLatestRecords(strengthRecords);

  const processedStrengthRecords = Object.entries(latestStrengthRecords).reduce(
    (acc, [exerciseName, record]) => {
      acc[exerciseName] = record[0];
      return acc;
    },
    {}
  );

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

  const handleWeightPercentageChange = (
    weightPercent,
    weight,
    targetExerciseIndex,
    targetSetIndex
  ) => {
    const newWeight = (weightPercent / 100) * weight;
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
                      weight: newWeight,
                    }
              ),
            }
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
        <TrainingSessionHeader
          description={trainingData.description}
          trainingSessionDate={trainingSessionDate}
          comment={comment}
          setComment={setComment}
        />
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
              {processedStrengthRecords[exercise.exercise]?.weight && (
                <>
                  <label>1RM</label>
                  <input
                    className="ats-exercise-parameter-input"
                    type="number"
                    value={Math.round(
                      processedStrengthRecords[exercise.exercise]?.weight
                    )}
                  />
                </>
              )}
            </div>
            <div className="exercise-table-container">
              <div className="exercise-table">
                <div className="exercise-table-header">
                  <label>Set</label>
                  {processedStrengthRecords[exercise.exercise]?.weight && (
                    <label>Percent</label>
                  )}
                  <label>Weight</label>
                  <label>Reps</label>
                </div>
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="exercise-table-row">
                    <label>&nbsp;&nbsp;&nbsp;{setIndex + 1}</label>
                    {processedStrengthRecords[exercise.exercise]?.weight && (
                      <input
                        className="ats-exercise-parameter-input"
                        type="number"
                        value={Math.round(
                          (set.weight /
                            processedStrengthRecords[exercise.exercise]
                              ?.weight) *
                            100
                        )}
                        onChange={(e) =>
                          handleWeightPercentageChange(
                            e.target.value,
                            processedStrengthRecords[exercise.exercise]?.weight,
                            exerciseIndex,
                            setIndex
                          )
                        }
                      />
                    )}
                    <input
                      className="ats-exercise-parameter-input"
                      name="weight"
                      type="number"
                      value={set.weight}
                      onChange={(e) =>
                        handleExerciseDetailsChange(e, exerciseIndex, setIndex)
                      }
                    />
                    <input
                      className="ats-exercise-parameter-input"
                      name="repetitions"
                      type="number"
                      value={set.repetitions}
                      onChange={(e) => {
                        handleExerciseDetailsChange(e, exerciseIndex, setIndex);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
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
