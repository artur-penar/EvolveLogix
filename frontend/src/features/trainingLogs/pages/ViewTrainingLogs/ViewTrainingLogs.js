import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrainingLogs } from "../../log";
import Layout from "components/shared/Layout";
import "./ViewTrainingLogs.css";

const ViewTrainingLogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrainingLogs());
  }, []);

  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);

  return (
    <Layout title="EvolveLogix | Training Log">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <React.Fragment>
            <div className="training-log-container">
              {trainingLogsData.map((log, index) => (
                <div key={index}>
                  <div className="header-container">
                    <h1>{log.name}</h1>
                  </div>
                  <div className="training-log-container">
                    {log.training_sessions.map((session, i) => (
                      <div key={`${index}-{i}`} className="training-log">
                        <h4>Name: {session.description}</h4>
                        <h5>Date: {session.date}</h5>
                        <h5>Comment: {session.comment}</h5>
                        {session.exercises.map((exercise, j) => (
                          <div key={j} className="ex">
                            <p>
                              Nr.{exercise.order} : {exercise.exercise}
                            </p>
                            {exercise.sets.map((set, k) => (
                              <div key={k} className="set">
                                <p>
                                  Set {set.set_number}: {set.weight}kg x{" "}
                                  {set.repetitions}rep
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        </>
      )}
    </Layout>
  );
};

export default ViewTrainingLogsPage;
