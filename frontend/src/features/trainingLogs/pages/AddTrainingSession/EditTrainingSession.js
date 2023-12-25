// External imports
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

// Internal imports
import { getTrainingLogs, updateTrainingSession } from "../../log";
import Layout from "components/shared/Layout";
import LoadingState from "features/trainingLogs/components/LoadingState";
import TrainingSessionForm from "features/trainingLogs/components/TrainingSessionForm";
import { selectIsUserAuthenticated } from "features/users/user";
import "./AddTrainingSession.css";

// Helper functions
const getLogNames = (trainingLogsData) =>
  trainingLogsData.map((log) => log.name);

const getExercisesNames = (exercises) =>
  exercises.map((exercise) => exercise.name);

const processExercises = (exercises) => {
  return exercises.map((exercise) => ({
    exercise: exercise.exercise,
    comment: exercise.comment,
    order: exercise.order,
    setsNumber: exercise.sets.length,
    sets: exercise.sets.map((set) => ({
      set_number: set.set_number,
      weight: set.weight,
      repetitions: set.repetitions,
    })),
  }));
};

/**
 * This is the main component for the Edit Training Session page.
 * It handles the editing of a training session, including updating the training session data and dispatching the update action.
 * It uses the useParams hook to get the id of the training session to be edited.
 */
const EditTrainingSessionPage = () => {
  const EMPTY_STRING = "";
  const navigate = useNavigate();
  const location = useLocation();

  // Redux hooks
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs); // Data fetching by id recieved from TrainingLogDashboard

  const selectedEventTrainingData = location.state.trainingData;

  const {
    date: trainingDate,
    comment: trainingComment,
    exercises: trainingExercises,
  } = selectedEventTrainingData;

  const processedExercises = processExercises(trainingExercises);

  // State variables
  const [loading, setLoading] = useState(true);
  const [logName, setLogName] = useState(EMPTY_STRING);
  const [date, setDate] = useState(trainingDate);
  const [comment, setComment] = useState(trainingComment);
  const [editedExercises, setEditedExercises] = useState(processedExercises);
  const [exerciseNames, setExerciseNames] = useState([]);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const exercisesData = useSelector((state) => state.exercises.exercises);

  console.log("EditTrainingSession exercisesData");
  console.log(exercisesData);

  const logNames = getLogNames(trainingLogsData);
  const exerciseNameList = getExercisesNames(exerciseNames);

  // Effect hooks
  useEffect(() => {
    dispatch(getTrainingLogs());
    setExerciseNames(exercisesData);
    setLoading(false);
  }, []);

  // Event handlers and other functions

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
    setEditedExercises(
      editedExercises.map((exercise, index) =>
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
    setEditedExercises(
      editedExercises.map((exercise, index) => {
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
    setEditedExercises([
      ...editedExercises,
      {
        exercise: EMPTY_STRING,
        sets: [
          { set_number: 1, weight: EMPTY_STRING, repetitions: EMPTY_STRING },
        ],
        setsNumber: 1,
        order: editedExercises.length + 1,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      id: selectedEventTrainingData.id,
      date: date,
      comment: comment,
      exercises: editedExercises,
    };
    console.log("Updated data!");
    console.log(updatedData);
    dispatch(updateTrainingSession(updatedData));

    navigate("/training-log");
  };

  // Function to fetch data by passed id from TrainingLogDashboard, keep that in mind for future modernisation
  // const specificTrainingData = trainingLogsData
  //   .flatMap((log) => log.training_sessions)
  //   .find((session) => Number(session.id) === Number(id));

  if (!isAuthenticated) return <Navigate to="/login" />;

  // JSX return
  return (
    <Layout title="Gym-Support | Training Log">
      {loading ? (
        <LoadingState />
      ) : (
        <TrainingSessionForm
          logName={logName}
          setLogName={setLogName}
          logNames={logNames}
          date={date}
          setDate={setDate}
          comment={comment}
          setComment={setComment}
          exercises={editedExercises}
          exerciseNameList={exerciseNameList}
          handleExerciseChange={handleExerciseChange}
          handleSetsNumberChange={handleSetsNumberChange}
          handleSubmit={handleSubmit}
          handleAddExercise={handleAddExercise}
        />
      )}
    </Layout>
  );
};

export default EditTrainingSessionPage;
