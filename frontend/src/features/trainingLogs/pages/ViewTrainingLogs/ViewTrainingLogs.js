import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrainingLogs } from "../../log";
import Layout from "components/shared/Layout";
import "./ViewTrainingLogs.css";
import { getWeek } from "date-fns";

const ViewTrainingLogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrainingLogs());
  }, []);

  // Fetch current selected training log
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );
  const trainingSessions = selectedTrainingLog.training_sessions;
  const sortedTrainingSessions = [...trainingSessions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  console.log("Sorted training sessions: ", sortedTrainingSessions);
  const loading = useSelector((state) => state.log.loading);

  const groupTrainingSessions = (trainingSessions) => {
    const trainingSessionGroups = {
      "Training A": [],
      "Training B": [],
      "Training C": [],
    };
    trainingSessions.map((session) => {
      const sessionDate = new Date(session.date);
      const weekNumber = getWeek(sessionDate, { weekStartsOn: 1 });

      if (trainingSessionGroups[session.description]) {
        trainingSessionGroups[session.description].push({
          ...session,
          weekNumber,
        });
      }
    });

    console.log(trainingSessionGroups);
    return trainingSessionGroups;
  };

  const calculateTrainingDaysPerWeek = (groupedTrainingSessions) => {
    let trainingDaysPerWeek = 0;
    Object.keys(groupedTrainingSessions).map((key) => {
      if (groupedTrainingSessions[key].length > 0) {
        trainingDaysPerWeek++;
      }
    });
    return trainingDaysPerWeek;
  };

  const groupedTrainingSessions = groupTrainingSessions(trainingSessions);
  const trainingDaysPerWeek = calculateTrainingDaysPerWeek(
    groupedTrainingSessions
  );

  return (
    <Layout title="EvolveLogix | Training Log">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="header-container">
            <h1>{selectedTrainingLog.name}</h1>
          </div>
          <div
            className="training-sessions-container"
            style={{
              gridTemplateColumns: ` repeat(${trainingDaysPerWeek}, minmax(300px, 1fr)  )`,
            }}
          >
            {sortedTrainingSessions.map((session, i) => (
              <div key={i} className="training-session">
                <h4>Tag: {session.description}</h4>
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
      )}
    </Layout>
  );
};

export default ViewTrainingLogsPage;
