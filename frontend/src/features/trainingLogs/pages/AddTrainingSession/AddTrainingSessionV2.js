import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import "./AddTrainingSessionV2.css";

const AddTrainingSessionV2 = () => {
  const loading = useSelector((state) => state.log.loading);
  const [comment, setComment] = useState("");
  const [trainingSessionDate, setTrainingSessionDate] = useState("");

  const [trainingData, setTrainingData] = useState({
    comment: "This is a comment",
    date: "2021-09-01",
    description: "This is a description",
    exercises: [
      {
        exercise: "Squat",
        order: 1,
        setsNumber: 3,
        sets: [
          { repetitions: 5, set_number: 1, weight: 100 },
          { repetitions: 5, set_number: 2, weight: 100 },
          { repetitions: 5, set_number: 3, weight: 100 },
        ],
      },
      {
        exercise: "Bench Press",
        order: 2,
        setsNumber: 3,
        sets: [
          { repetitions: 5, set_number: 1, weight: 60 },
          { repetitions: 5, set_number: 2, weight: 60 },
          { repetitions: 5, set_number: 3, weight: 60 },
        ],
      },
    ],
  });

  // console.log(trainingData[0].exercises[0].setsNumber);

  return (
    <Layout title="EvolveLogix | Training Log">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <React.Fragment>
            <div className="training-log-container">
              <div className="header-container">
                <h1>Add Training Session</h1>
              </div>
              <div className="training-log-container">
                <div className="training-session">
                  <h4>Name: {trainingData.description}</h4>
                  <label>Date:</label>
                  <input type="date" value={trainingSessionDate} />
                  <label>Comment:</label>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  {trainingData.exercises.map(
                    (exercise, j) => (
                      console.log("J", j),
                      (
                        <div key={j} className="ex">
                          <p>
                            Nr.{exercise.order} : {exercise.exercise}
                          </p>
                          <label>Sets:</label>
                          <input
                            type="number"
                            value={trainingData.exercises[j].setsNumber}
                          />
                          {exercise.sets.map((set, k) => (
                            <div key={k} className="set">
                              <p>
                                Set {set.set_number}: {set.weight}kg x{" "}
                                {set.repetitions}rep
                              </p>
                            </div>
                          ))}
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        </>
      )}
    </Layout>
  );
};

export default AddTrainingSessionV2;
