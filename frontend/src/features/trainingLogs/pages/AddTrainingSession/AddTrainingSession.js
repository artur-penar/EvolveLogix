// React and Redux imports
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Component imports
import Layout from "shared/components/Layout";
import TrainingSessionHeader from "./components/TrainingSessionHeader";
import ExerciseHeader from "./components/ExerciseHeader";
import ExerciseTable from "./components/ExerciseTable";
import PageHeader from "shared/components/PageHeader";

// Hook imports
import useHandleSubmit from "features/trainingLogs/hooks/AddTrainingSession/useHandleSubmit";

// Handler imports
import {
  handleAddExercise,
  handleSetsNumberChange,
  handleExerciseDetailsChange,
  handleRemoveExercise,
  handleWeightPercentageChange,
  handleCheckboxChange,
  handleExerciseChange,
  handleTrainingDataChange,
} from "features/trainingLogs/handlers";

import useTrainingData from "features/trainingLogs/hooks/AddTrainingSession/useTrainingData";
import useStrengthRecords from "features/trainingLogs/hooks/AddTrainingSession/useStrengthRecords";
import ExerciseDetailsSummary from "./components/ExerciseDetailsSummary";

// Style imports
import "./AddTrainingSession.css";

const AddTrainingSession = () => {
  const location = useLocation();

  // State variables
  const exercisesData = useSelector((state) => state.exercises.exercises);
  const selectedTrainingLogId = useSelector(
    (state) => state.log.selectedTrainingLog.id
  );

  // Derived data
  const exerciseNamesList = exercisesData.map((exercise) => exercise.name);
  const editData = location.state?.trainingData;
  const isEditMode = !!editData;
  const selectedDate = location.state?.selectedDate; // This is the selected date from the calendar
  const currentDate = new Date().toISOString().split("T")[0];

  // Custom hooks
  const [trainingData, setTrainingData] = useTrainingData(
    editData,
    selectedDate,
    currentDate
  );
  const strengthRecords = useStrengthRecords();

  const handleSubmit = useHandleSubmit(
    trainingData,
    editData,
    isEditMode,
    selectedTrainingLogId
  );

  // Handlers
  const changeTrainingData = (e) => {
    handleTrainingDataChange(e, trainingData, setTrainingData);
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

  return (
    <Layout title="EvolveLogix | Training Log">
      <div className="ats-container">
        <PageHeader
          headerContent={
            isEditMode ? "Edit Training Session" : "Add Training Session"
          }
        />
        <div className="ats-training-session bg-containers">
          <TrainingSessionHeader
            description={trainingData.description}
            trainingSessionDate={trainingData.date}
            handleTrainingDataChange={changeTrainingData}
            comment={trainingData.comment}
            setComment={changeTrainingData}
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
              <ExerciseDetailsSummary
                exercise={exercise}
                strengthRecords={strengthRecords}
              />
              <button
                className="ats-constant-size-button"
                onClick={() => removeExercise(exerciseIndex)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="ats-button-container">
            <button className="ats-button" onClick={addExercise}>
              Add Exercise
            </button>
            <button
              className="ats-button"
              onClick={(event) => handleSubmit(event)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddTrainingSession;
