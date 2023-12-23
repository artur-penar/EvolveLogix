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

// Function to get log names
const getLogNames = (trainingLogsData) =>
  trainingLogsData.map((log) => log.name);

// Function to get exercise names
const getExercisesNames = (exercises) =>
  exercises.map((exercise) => exercise.name);

const AddTrainingSessionPage = () => {
  const EMPTY_STRING = "";
  const dispatch = useDispatch();

  // Fetch training log on component mount
  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const logNames = useMemo(
    () => getLogNames(trainingLogsData),
    [trainingLogsData]
  );

  const [exerciseList, setExerciseList] = useState([]);

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

  const exerciseNameList = useMemo(
    () => getExercisesNames(exerciseList),
    [exerciseList]
  );

  // Form state
  const [loading, setLoading] = useState(true);
  const [logName, setLogName] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [setsNumber, setSetsNumber] = useState(1);
  const [exercises, setExercises] = useState([
    { exercise: "", sets: [{ weight: "", repetitions: "" }], setsNumber: 1 },
  ]);

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
      { exercise: "", sets: [{ weight: "", repetitions: "" }] },
    ]);
  };

  // Handle form submission
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
            sets: [
              {
                weight: exercise.weight,
                repetitions: exercise.repetitions,
              },
            ],
          })),
        },
      ],
    };

    // Here you can call your API to send the data
  };
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
