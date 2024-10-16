import React from "react";
import { getWeek, startOfWeek } from "date-fns";
import getWeekStartAndEndDates from "features/trainingLogs/utils/getWeekStartAndEndDates";

const GroupedTrainingSessions = ({ trainingSessions }) => {
  const groupSessionsByWeek = (trainingSessions) => {
    const groupedSessions = {};
    trainingSessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      const weekNumber = getWeek(sessionDate, { weekStartsOn: 1 });

      if (groupedSessions[weekNumber]) {
        groupedSessions[weekNumber].push(session);
      } else {
        groupedSessions[weekNumber] = [session];
      }
    });

    return groupedSessions;
  };

  const groupedSessions = groupSessionsByWeek(trainingSessions);
  const calculateTrainingDaysPerWeek = (groupedSessions) => {
    const uniqueTrainingDescriptions = new Set();
    Object.values(groupedSessions).forEach((sessions) => {
      sessions.forEach((session) => {
        uniqueTrainingDescriptions.add(session.description);
      });
    });
    return uniqueTrainingDescriptions.size;
  };

  const trainingDaysPerWeek = calculateTrainingDaysPerWeek(groupedSessions);

  return (
    <div
      className="grouped-session-container"
      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      {Object.entries(groupedSessions).map(([week, sessions]) => (
        <div className="training-week-container">
          <div className="header-container">
            <h4>Week {week}</h4>
          </div>
          <div
            className="training-sessions-container"
            style={{
              gridTemplateColumns: ` repeat(${trainingDaysPerWeek}, minmax(300px, 1fr)  )`,
            }}
          >
            {sessions
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((session, i) => (
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
                            {set.repetitions} reps
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
  );
};

export default GroupedTrainingSessions;
