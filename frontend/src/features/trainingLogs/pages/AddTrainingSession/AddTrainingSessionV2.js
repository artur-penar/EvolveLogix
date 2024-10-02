import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import useFetchStrengthRecords from "features/trainingCycle/hooks/PhaseForm/useFetchStrengthRecords";
import useGetLatestRecords from "features/trainingCycle/hooks/PercentageCalculator/useGetLatestStrengthRecords";
import "./AddTrainingSessionV2.css";
import TrainingSessionHeader from "./components/TrainingSessionHeader";
import ExerciseHeader from "./components/ExerciseHeader";
import ExerciseTable from "./components/ExerciseTable";

const AddTrainingSessionV2 = () => {
  const [comment, setComment] = useState("");
  const [trainingSessionDate, setTrainingSessionDate] = useState("");

  const strengthRecords = Object.entries(
    useGetLatestRecords(useFetchStrengthRecords())
  ).reduce((acc, [exerciseName, record]) => {
    acc[exerciseName] = record[0];
    return acc;
  }, {});

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
          { set_number: 1, weight: 60, repetitions: 5, is_completed: true },
          { set_number: 2, weight: 80, repetitions: 5, is_completed: true },
          { set_number: 3, weight: 90, repetitions: 5, is_completed: true },
        ],
      },
      {
        exercise: "Bench Press",
        sets: [
          { set_number: 1, weight: 100, repetitions: 5, is_completed: true },
          { set_number: 2, weight: 100, repetitions: 5, is_completed: true },
          { set_number: 3, weight: 100, repetitions: 5, is_completed: true },
        ],
      },
    ],
  });

  const handleCheckboxChange = (e, exerciseIndex, setIndex) => {
    console.log("exerciseIndex", exerciseIndex);
    console.log("setIndex", setIndex);
    const newIsCompleted = e.target.checked;
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
        currentExerciseIndex !== exerciseIndex
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, currentSetIndex) =>
                currentSetIndex !== setIndex
                  ? set
                  : {
                      ...set,
                      is_completed: newIsCompleted,
                    }
              ),
            }
      ),
    });
  };

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
            <ExerciseHeader
              exerciseIndex={exerciseIndex}
              exerciseName={exercise.exercise}
              exerciseNamesList={exerciseNamesList}
              exercises={trainingData.exercises}
              processedStrengthRecords={strengthRecords}
              handleExerciseChange={handleExerciseChange}
              handleSetsNumberChange={handleSetsNumberChange}
            />

            <ExerciseTable
              exercise={exercise}
              strengthRecords={strengthRecords}
              exerciseName={exercise.exercise}
              exerciseIndex={exerciseIndex}
              handleCheckboxChange={handleCheckboxChange}
              handleWeightPercentageChange={handleWeightPercentageChange}
              handleExerciseDetailsChange={handleExerciseDetailsChange}
            />
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
