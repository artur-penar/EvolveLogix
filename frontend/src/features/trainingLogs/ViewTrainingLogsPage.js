import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrainingLog } from "./log";
import Layout from "components/shared/Layout";

const ViewTrainingLogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);
  console.log("Training logs");
  console.log(trainingLogsData);

  return (
    <Layout title="Auth Site | Training Log">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {trainingLogsData.map((log, index) => (
            <div key={index}>
              <h1>Name: {log.name}</h1>
              {log.training_sessions.map((session, i) => (
                <div key={i}>
                  <h3>Date: {session.date}</h3>
                  <h4>Session Name: {session.comment}</h4>
                  {session.exercises.map((exercise, j) => (
                    <div key={j}>
                      <h4>Exercise: {exercise.exercise}</h4>
                      <p>Comment: {exercise.comment}</p>
                      {exercise.sets.map((set, k) => (
                        <div key={k}>
                          <p>
                            Set {set.set_number}: {set.weight}kg for{" "}
                            {set.repetitions} reps. Comment: {set.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ViewTrainingLogsPage;
