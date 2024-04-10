// External imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

// Internal imports
import { getTrainingLogs, updateTrainingSession } from "../../log";
import Layout from "components/shared/Layout";
import LoadingState from "components/shared/LoadingState";
import TrainingSessionForm from "features/trainingLogs/sharedComponents/TrainingSessionForm";
import { selectIsUserAuthenticated } from "features/users/user";
import "./AddTrainingSession.css";

// Helper functions

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
  // Constants
  const EMPTY_STRING = "";

  // React Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Data from location state
  const selectedEventTrainingData = location.state.trainingData;
  const {
    description: trainingDescription,
    date: trainingDate,
    comment: trainingComment,
    exercises: trainingExercises,
  } = selectedEventTrainingData;

  // Processed exercises
  const processedExercises = processExercises(trainingExercises);

  // Redux hooks
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const exercisesData = useSelector((state) => state.exercises.exercises);

  // Derived state
  const exerciseNameList = getExercisesNames(exercisesData);

  // Redux state
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );
  const logName = selectedTrainingLog.name;

  // State hooks
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(trainingDate);
  const [comment, setComment] = useState(trainingComment);
  const [description, setDescription] = useState(trainingDescription);
  const [editedExercises, setEditedExercises] = useState(processedExercises);

  // Side effects
  useEffect(() => {
    dispatch(getTrainingLogs());
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
        exercise: "Squat",
        sets: [
          { set_number: 1, weight: EMPTY_STRING, repetitions: EMPTY_STRING },
        ],
        setsNumber: 1,
        order: editedExercises.length + 1,
      },
    ]);
  };

  const handleRemoveExercise = (exerciseIndexToRemove) => {
    setEditedExercises(
      editedExercises.filter((_, index) => index !== exerciseIndexToRemove)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      id: selectedEventTrainingData.id,
      description: description,
      date: date,
      comment: comment,
      exercises: editedExercises,
    };

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
    <Layout title="EvolveLogix | Training Log">
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <h1 className="h1-title">Edit Training Session</h1>
          <h2 className="h2-subtitle">Current log: {logName}</h2>
          <TrainingSessionForm
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            comment={comment}
            setComment={setComment}
            exercises={editedExercises}
            exerciseNameList={exerciseNameList}
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

export default EditTrainingSessionPage;
