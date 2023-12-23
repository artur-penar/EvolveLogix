// External imports
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// Internal imports
import { addTrainingSession, getTrainingLog } from "../../log";
import ApiServices from "../../services/ApiService";
import Layout from "components/shared/Layout";
import DateField from "../../components/DateField";
import CommentField from "../../components/CommentField";
import ExerciseField from "../../components/ExerciseField";
import TrainingLogNameField from "../../components/TrainingLogNameField";
import { selectIsUserAuthenticated } from "features/users/user";
import LoadingState from "features/trainingLogs/components/LoadingState";
import TrainingSessionForm from "features/trainingLogs/components/AddTrainingSessionForm";
import "./AddTrainingSession.css";

// Function to get log names
const getLogNames = (trainingLogsData) =>
  trainingLogsData.map((log) => log.name);

// Function to get exercise names
const getExercisesNames = (exercises) =>
  exercises.map((exercise) => exercise.name);

const AddTrainingSessionPage = () => {
  // Const
  const EMPTY_STRING = "";

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  // Fetch training log on component mount
  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  // Fetch exercises on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServices.get("/training_log/exercises");
        setExerciseList(res);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // State variables
  const [loading, setLoading] = useState(true);
  const [logName, setLogName] = useState("");
  const [date, setDate] = useState(
    location.state?.selectedDate || new Date().toISOString().substring(0, 10)
  );
  const [comment, setComment] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [exercises, setExercises] = useState([
    {
      exercise: "Squat",
      sets: [{ weight: "", repetitions: "" }],
      setsNumber: 1,
    },
  ]);

  // Memoized functions
  const exerciseNameList = useMemo(
    () => getExercisesNames(exerciseList),
    [exerciseList]
  );

  const logNames = useMemo(
    () => getLogNames(trainingLogsData),
    [trainingLogsData]
  );

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
    setExercises([
      ...exercises,
      {
        exercise: "Squat",
        sets: [
          { set_number: 1, weight: EMPTY_STRING, repetitions: EMPTY_STRING },
        ],
        setsNumber: 1,
      },
    ]);
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
      training_sessions: [
        {
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
        <TrainingSessionForm
          logName={logName}
          setLogName={setLogName}
          logNames={logNames}
          date={date}
          setDate={setDate}
          comment={comment}
          setComment={setComment}
          exercises={exercises}
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

export default AddTrainingSessionPage;
