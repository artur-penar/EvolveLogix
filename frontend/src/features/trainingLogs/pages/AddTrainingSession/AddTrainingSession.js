// External imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// Internal imports
import { addTrainingSession, getTrainingLogs } from "../../log";
import { selectIsUserAuthenticated } from "features/users/user";
import Layout from "components/shared/Layout";
import LoadingState from "components/shared/LoadingState";
import TrainingSessionForm from "features/trainingLogs/components/TrainingSessionForm";
import "./AddTrainingSession.css";

// Function to get exercise names
const getExercisesNames = (exercises) =>
  exercises.map((exercise) => exercise.name);

const AddTrainingSessionPage = () => {
  // Constants
  const EMPTY_STRING = "";

  // React Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Initial state for exercises
  const initialExerciseState = {
    exercise: "Squat",
    sets: [{ weight: EMPTY_STRING, repetitions: EMPTY_STRING }],
    setsNumber: 1,
  };

  // Redux hooks
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const exercisesData = useSelector((state) => state.exercises.exercises);

  // Derived state
  const exerciseNames = getExercisesNames(exercisesData);

  // Redux state
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );
  const logName = selectedTrainingLog.name;

  // State hooks
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(
    location.state?.selectedDate || new Date().toISOString().substring(0, 10)
  );
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([initialExerciseState]);

  // Side effects
  useEffect(() => {
    dispatch(getTrainingLogs());
    setLoading(false);
  }, []);

  // Set logic
  const updateSets = (exercise, newSetsNumber) => {
    const newSets = [...exercise.sets];
    if (newSets.length >= 1)
      if (newSetsNumber < newSets.length) {
        newSets.length = newSetsNumber;
      } else {
        while (newSets.length < newSetsNumber) {
          newSets.push({
            weight: EMPTY_STRING,
            repetitions: EMPTY_STRING,
            set_number: newSets.length + 1,
          });
        }
      }
    return newSets;
  };

  const handleSetsNumberChange = (e, exerciseIndex) => {
    const newSetsNumber = parseInt(e.target.value, 10);
    setExercises(
      exercises.map((exercise, index) =>
        index !== exerciseIndex
          ? exercise
          : {
              ...exercise,
              sets: updateSets(exercise, newSetsNumber),
              setsNumber: newSetsNumber,
            }
      )
    );
  };

  // Exercise logic
  const updateExercise = (e, exercise, setIndex) => {
    return {
      ...exercise,
      sets: exercise.sets.map((set, index) => {
        if (index !== setIndex) {
          return set;
        } else {
          return { ...set, [e.target.name]: e.target.value };
        }
      }),
    };
  };

  const handleExerciseChange = (e, exerciseIndex, setIndex) => {
    setExercises(
      exercises.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;
        if (setIndex !== undefined) {
          return updateExercise(e, exercise, setIndex);
        } else {
          return {
            ...exercise,
            exercise: e.target.value,
          };
        }
      })
    );
  };

  const handleAddExercise = () => {
    setExercises([...exercises, initialExerciseState]);
  };

  const handleRemoveExercise = (exerciseIndexToRemove) => {
    setExercises(
      exercises.filter((_, index) => index !== exerciseIndexToRemove)
    );
  };

  // Submission logic
  const checkForEmptyFields = () => {
    for (let exercise of exercises) {
      for (let set of exercise.sets) {
        if (set.repetitions === "" || set.weight === "") {
          alert("Weight and repetitions cannot be empty.");
          return true;
        }
      }
    }
    return false;
  };

  const prepareExercisesForSubmission = (exercises) => {
    return exercises.map((exercise) => ({
      exercise: exercise.exercise,
      sets: exercise.sets.map((set) => ({
        weight: set.weight,
        repetitions: set.repetitions,
      })),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkForEmptyFields()) return;

    const dataToSubmit = {
      name: logName,
      training_log_id: selectedTrainingLog.id,
      training_sessions: [
        {
          description,
          date,
          comment,
          exercises: prepareExercisesForSubmission(exercises),
        },
      ],
    };

    dispatch(addTrainingSession(dataToSubmit));
    navigate("/training-log");
  };

  // Return JSX
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout title="Gym-Support | Training Log">
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <h1 className="h1-title">Add Training Session</h1>
          <h2 className="h2-subtitle">Current log: {logName}</h2>
          <TrainingSessionForm
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            comment={comment}
            setComment={setComment}
            exercises={exercises}
            exerciseNameList={exerciseNames}
            handleAddExercise={handleAddExercise}
            handleRemoveExercise={handleRemoveExercise}
            handleExerciseChange={handleExerciseChange}
            handleSetsNumberChange={handleSetsNumberChange}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </Layout>
  );
};

export default AddTrainingSessionPage;
