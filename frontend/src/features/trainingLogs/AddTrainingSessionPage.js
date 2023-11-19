// External imports
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Internal imports
import ApiServices from "./services/ApiService";
import Layout from "components/shared/Layout";
import { getTrainingLog } from "./log";
import DateField from "./components /DateField";
import TrainingLogNameField from "./components /TrainingLogNameField";
import CommentField from "./components /CommentField";
import SetField from "./components /SetField";
import "./AddTrainingSessionPage.css";

// Function to get log names
const getLogNames = (trainingLogsData) =>
  trainingLogsData.map((log) => log.name);

// Function to get exercise names
const getExercisesNames = (exercises) =>
  exercises.map((exercise) => exercise.name);

const AddTrainingSessionPage = () => {
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
  const [logName, setLogName] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [setsNumber, setSetsNumber] = useState(1);
  const [exercises, setExercises] = useState([
    { exercise: "", sets: [{ weight: "", repetitions: "" }], setsNumber: 1 },
  ]);

  const handleSetsNumberChange = (e, exerciseIndex) => {
    const newSetsNumber = parseInt(e.target.value, 10);
    setExercises(
      exercises.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;
        const newSets = [...exercise.sets];
        if (newSetsNumber < newSets.length) {
          newSets.length = newSetsNumber;
        } else
          while (newSets.length < newSetsNumber) {
            newSets.push({ weight: "", repetitions: "" });
          }
        return { ...exercise, sets: newSets, setsNumber: newSetsNumber };
      })
    );
  };
  const handleExerciseChange = (e, exerciseIndex, setIndex) => {
    const newExercises = [...exercises];
    if (setIndex !== undefined) {
      // This is a change to a set value
      if (
        newExercises[exerciseIndex] &&
        newExercises[exerciseIndex].sets[setIndex]
      ) {
        newExercises[exerciseIndex].sets[setIndex][e.target.name] =
          e.target.value;
      }
    } else {
      // This is a change to an exercise name
      if (newExercises[exerciseIndex]) {
        newExercises[exerciseIndex].exercise = e.target.value;
      }
    }
    setExercises(newExercises);
  };

  const handleAddSet = (exerciseIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({ weight: "", repetitions: "" });
    setExercises(newExercises);
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
      <div className="add-training-container">
        <div className="left-panel">
          <TrainingLogNameField
            logName={logName}
            setLogName={setLogName}
            logNames={logNames}
          />
          <DateField date={date} setDate={setDate} />
          <CommentField comment={comment} setComment={setComment} />
        </div>
        <form onSubmit={handleSubmit} className="form">
          {exercises.map((exercise, index) => (
            <div className="exercise" key={index}>
              <div className="exercise-set-container">
                <div className="exercise-left-panel">
                  <div className="form-group">
                    <label className="form-label" htmlFor={`exercise${index}`}>
                      Name:
                      <select
                        className="form-control"
                        name="exercise"
                        value={exercise.exercise}
                        onChange={(e) => handleExerciseChange(e, index)}
                      >
                        {exerciseNameList.map((name, i) => (
                          <option key={i} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <div className="form-group">
                        <label className="form-label" htmlFor={`sets${index}`}>
                          Sets
                          <input
                            className="form-control"
                            type="number"
                            name="setsNumber"
                            value={exercise.setsNumber}
                            onChange={(e) => handleSetsNumberChange(e, index)}
                          />
                        </label>
                      </div>
                    </label>
                  </div>
                </div>

                <SetField
                  exercise={exercise}
                  index={index}
                  setsNumber={exercise.setsNumber}
                  handleExerciseChange={handleExerciseChange}
                  handleSetsNumberChange={handleSetsNumberChange}
                />
              </div>
            </div>
          ))}
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
    </Layout>
  );
};

export default AddTrainingSessionPage;
