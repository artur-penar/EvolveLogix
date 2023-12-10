// External imports
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Internal imports
import { addTrainingSession, getTrainingLog } from "../../log";
import ApiServices from "../../services/ApiService";
import Layout from "components/shared/Layout";
import DateField from "../../components/DateField";
import TrainingLogNameField from "../../components/TrainingLogNameField";
import CommentField from "../../components/CommentField";
import ExerciseField from "../../components/ExerciseField";
import { selectIsUserAuthenticated } from "features/users/user";
import { Navigate } from "react-router-dom";
import "./AddTrainingSession.css";

const processExercises = (exercises) => {
  if (!exercises) {
    return [];
  }

  return exercises.map((exercise) => ({
    exercise: exercise.exercise,
    setsNumber: exercise.sets.length,
    sets: exercise.sets.map((set) => ({
      weight: set.weight,
      repetitions: set.repetitions,
    })),
  }));
};

const AddTrainingSessionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clickedCalendarDate = location.state?.selectedDate || "";
  const clickedEventTrainingData = location.state
    ? location.state.trainingData
    : "";
  const {
    date: trainingDate,
    comment: trainingComment,
    exercises: trainingExercises,
  } = clickedEventTrainingData || {};

  const processedExercises = processExercises(trainingExercises);

  // State variables
  const [loading, setLoading] = useState(true);
  const [logName, setLogName] = useState("");
  const [date, setDate] = useState(
    clickedCalendarDate ? clickedCalendarDate : trainingDate || ""
  );
  const [comment, setComment] = useState(trainingComment || "");
  const [exercises, setExercises] = useState(
    processedExercises || [
      {
        exercise: "",
        sets: [{ weight: "", repetitions: "" }],
        setsNumber: "",
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
          !clickedEventTrainingData ||
          Object.keys(clickedEventTrainingData).length == 0
        ) {
          setExercises([
            {
              exercise: res[0].name,
              sets: [{ weight: "", repetitions: "" }],
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
          newSets.push({ weight: "", repetitions: "" });
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
      { exercise: "", sets: [{ weight: "", repetitions: "" }], setsNumber: 1 },
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
    dispatch(addTrainingSession(data));
    navigate("/training-log");

    console.log(data);
  };

  console.log("Training data sendet from Event");
  console.log(clickedEventTrainingData);
  console.log("Training exercises");
  console.log(trainingExercises);
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
