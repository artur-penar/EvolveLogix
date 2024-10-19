import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "components/shared/Layout";
import useFetchStrengthRecords from "features/trainingCycle/hooks/PhaseForm/useFetchStrengthRecords";
import useGetLatestRecords from "features/trainingCycle/hooks/PercentageCalculator/useGetLatestStrengthRecords";
import TrainingSessionHeader from "./components/TrainingSessionHeader";
import ExerciseHeader from "./components/ExerciseHeader";
import ExerciseTable from "./components/ExerciseTable";
import handleAddExercise from "features/trainingLogs/handlers/handleAddExercise";
import handleSetsNumberChange from "features/trainingLogs/handlers/handleSetsNumberChange";
import handleExerciseDetailsChange from "features/trainingLogs/handlers/handleExerciseDetailsChange";
import handleRemoveExercise from "features/trainingLogs/handlers/handleRemoveExercise";
import handleWeightPercentageChange from "features/trainingLogs/handlers/handleWeightPercentageChange";
import handleCheckboxChange from "features/trainingLogs/handlers/handleCheckboxChange";
import useHandleSubmit from "features/trainingLogs/hooks/useHandleSubmit";
import "./AddTrainingSession.css";
import handleExerciseChange from "features/trainingLogs/handlers/handleExerciseChange";

const AddTrainingSession = () => {
  const location = useLocation();

  const exercisesData = useSelector((state) => state.exercises.exercises);
  const exerciseNamesList = exercisesData.map((exercise) => exercise.name);
  const selectedTrainingLogId = useSelector(
    (state) => state.log.selectedTrainingLog.id
  );

  const editData = location.state?.trainingData;
  const isEditMode = !!editData;
  const selectedDate = location.state?.selectedDate;
  const formattedDate = new Date().toISOString().split("T")[0];

  const strengthRecords = Object.entries(
    useGetLatestRecords(useFetchStrengthRecords())
  ).reduce((acc, [exerciseName, record]) => {
    acc[exerciseName] = record[0];
    return acc;
  }, {});

  const [trainingData, setTrainingData] = useState(
    editData
      ? editData
      : {
          comment: "This is a comment",
          date: selectedDate ? selectedDate : formattedDate,
          description: "This is a description",
          exercises: [
            {
              exercise: "Squat",
              sets: [
                {
                  set_number: 1,
                  weight: 0,
                  repetitions: 0,
                  is_completed: true,
                },
              ],
            },
          ],
        }
  );

  const handleTrainingDataChange = (e) => {
    const { name, value } = e.target;
    setTrainingData({
      ...trainingData,
      [name]: value,
    });
  };

  const changeCheckbox = (e, exerciseIndex, setIndex) => {
    handleCheckboxChange(
      e,
      exerciseIndex,
      setIndex,
      trainingData,
      setTrainingData
    );
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

  const changeExercise = (e, targetExerciseIndex) => {
    handleExerciseChange(e, targetExerciseIndex, trainingData, setTrainingData);
  };

  const changeExerciseDetails = (e, targetExerciseIndex, targetSetIndex) => {
    handleExerciseDetailsChange(
      e,
      targetExerciseIndex,
      targetSetIndex,
      trainingData,
      setTrainingData
    );
  };

  const changeSetsNumber = (e, targetExerciseIndex) => {
    handleSetsNumberChange(
      e,
      targetExerciseIndex,
      trainingData,
      setTrainingData
    );
  };

  const addExercise = () => {
    handleAddExercise(trainingData, setTrainingData);
  };

  const removeExercise = (exerciseIndexToRemove) => {
    handleRemoveExercise(exerciseIndexToRemove, trainingData, setTrainingData);
  };

  const changeWeightPercentage = (
    weightPercent,
    weight,
    targetExerciseIndex,
    targetSetIndex
  ) => {
    handleWeightPercentageChange(
      weightPercent,
      weight,
      targetExerciseIndex,
      targetSetIndex,
      trainingData,
      setTrainingData
    );
  };

  const handleSubmit = useHandleSubmit(
    trainingData,
    editData,
    isEditMode,
    selectedTrainingLogId
  );

  return (
    <Layout title="EvolveLogix | Training Log">
      <div className="header-container">
        <h1>{isEditMode ? "Edit Training Session" : "Add Training Session"}</h1>
      </div>
      <div className="ats-training-session">
        <TrainingSessionHeader
          description={trainingData.description}
          trainingSessionDate={trainingData.date}
          handleTrainingDataChange={handleTrainingDataChange}
          comment={trainingData.comment}
          setComment={handleTrainingDataChange}
        />
        {trainingData.exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="ats-exercise">
            <ExerciseHeader
              exerciseIndex={exerciseIndex}
              exerciseName={exercise.exercise}
              exerciseNamesList={exerciseNamesList}
              exercises={trainingData.exercises}
              processedStrengthRecords={strengthRecords}
              handleExerciseChange={changeExercise}
              handleSetsNumberChange={changeSetsNumber}
            />

            <ExerciseTable
              exercise={exercise}
              strengthRecords={strengthRecords}
              exerciseName={exercise.exercise}
              exerciseIndex={exerciseIndex}
              handleCheckboxChange={changeCheckbox}
              handleWeightPercentageChange={changeWeightPercentage}
              handleExerciseDetailsChange={changeExerciseDetails}
            />
            <p>Exercise volume: {calculateTotalVolume(exercise)}kg</p>
            <button onClick={() => removeExercise(exerciseIndex)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={addExercise}>Add exercise</button>
      <button onClick={(event) => handleSubmit(event)}>Submit</button>
    </Layout>
  );
};

export default AddTrainingSession;
