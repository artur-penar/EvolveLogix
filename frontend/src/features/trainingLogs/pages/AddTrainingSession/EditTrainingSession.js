// External imports
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

// Internal imports
import {
  addTrainingSession,
  getTrainingLog,
  updateTrainingSession,
} from "../../log";
import ApiServices from "../../services/ApiService";
import Layout from "components/shared/Layout";
import DateField from "../../components/DateField";
import TrainingLogNameField from "../../components/TrainingLogNameField";
import CommentField from "../../components/CommentField";
import ExerciseField from "../../components/ExerciseField";
import { selectIsUserAuthenticated } from "features/users/user";
import "./AddTrainingSession.css";

const processExercises = (exercises) => {
  if (!exercises) {
    return [];
  }
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

const AddTrainingSessionPage = () => {
  const EMPTY_STRING = "";
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCalendarDate = location.state?.selectedDate || EMPTY_STRING;
  const selectedEventTrainingData = location.state
    ? location.state.trainingData
    : EMPTY_STRING;
  const {
    date: trainingDate,
    comment: trainingComment,
    exercises: trainingExercises,
  } = selectedEventTrainingData || {};

  const processedExercises = processExercises(trainingExercises);

  // State variables
  const [loading, setLoading] = useState(true);
  const [logName, setLogName] = useState(EMPTY_STRING);
  const [date, setDate] = useState(
    selectedCalendarDate ? selectedCalendarDate : trainingDate || EMPTY_STRING
  );
  const [comment, setComment] = useState(trainingComment || EMPTY_STRING);
  const [exercises, setExercises] = useState(
    processedExercises || [
      {
        exercise: EMPTY_STRING,
        sets: [{ weight: EMPTY_STRING, repetitions: EMPTY_STRING }],
        setsNumber: EMPTY_STRING,
      },
    ]
  );
  const [exerciseList, setExerciseList] = useState([]);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  const getLogNames = (trainingLogsData) =>
    trainingLogsData.map((log) => log.name);

  const getExercisesNames = (exercises) =>
    exercises.map((exercise) => exercise.name);

  // Redux hooks
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);

  // Memoized values
  const logNames = useMemo(
    () => getLogNames(trainingLogsData),
    [trainingLogsData]
  );
  const exerciseNameList = useMemo(
    () => getExercisesNames(exerciseList),
    [exerciseList]
  );

  // Effect hooks
  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServices.get("/training_log/exercises");
        setExerciseList(res);
        setLoading(false);
        if (
          !selectedEventTrainingData ||
          Object.keys(selectedEventTrainingData).length == 0
        ) {
          setExercises([
            {
              exercise: res[0].name,
              sets: [{ weight: EMPTY_STRING, repetitions: EMPTY_STRING }],
              setsNumber: 1,
            },
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
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
        exercise: EMPTY_STRING,
        sets: [
          { set_number: 1, weight: EMPTY_STRING, repetitions: EMPTY_STRING },
        ],
        setsNumber: 1,
        order: exercises.length + 1,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: logName,
      training_sessions: [
        {
          date,
          comment,
          exercises: exercises.map((exercise) => ({
            exercise: exercise.exercise,
            sets: exercise.sets.map((set) => ({
              weight: set.weight,
              repetitions: set.repetitions,
            })),
          })),
        },
      ],
    };

    if (selectedEventTrainingData.length !== 0) {
      console.log("Updating training session triggered!");
      const updatedData = {
        id: selectedEventTrainingData.id,
        date: date,
        comment: comment,
        exercises: exercises,
      };
      console.log("Updated data!");
      console.log(updatedData);
      dispatch(
        updateTrainingSession({
          id: selectedEventTrainingData.id,
          ...updatedData,
        })
      );
    } else {
      console.log("Adding training session triggered!");
      dispatch(addTrainingSession(data));
    }
    navigate("/training-log");

    console.log("Data sendet to update");
    console.log(data);
  };

  console.log("Training data sendet from Event");
  console.log(selectedEventTrainingData);
  console.log("Training exercises");
  console.log(trainingExercises);
  console.log("Processed exercise:");
  console.log(exercises);

  if (!isAuthenticated) return <Navigate to="/login" />;

  // JSX return
  return (
    <Layout title="Gym-Support | Training Log">
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="add-training-container">
          <div className="field-container">
            <TrainingLogNameField
              logName={logName}
              setLogName={setLogName}
              logNames={logNames}
            />
            <DateField date={date} setDate={setDate} />
            <CommentField comment={comment} setComment={setComment} />
          </div>
          <form onSubmit={handleSubmit} className="form">
            <ExerciseField
              exercises={exercises}
              exerciseNameList={exerciseNameList}
              handleExerciseChange={handleExerciseChange}
              handleSetsNumberChange={handleSetsNumberChange}
            />
            <button
              type="button"
              onClick={handleAddExercise}
              className="button button-add-exercise"
            >
              Add Exercise
            </button>
            <button type="submit" className="button button-submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default AddTrainingSessionPage;
